import { useId, useState, type FormEvent } from "react";

import { FIRM } from "../../lib/site";
import { Arrow } from "./Arrow";

type Fields = {
  nom: string;
  prenom: string;
  societe: string;
  email: string;
  telephone: string;
  objet: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  nom: "",
  prenom: "",
  societe: "",
  email: "",
  telephone: "",
  objet: "Expertise comptable",
  message: "",
};

const SUBJECTS = [
  "Expertise comptable",
  "Audit et commissariat aux comptes",
  "Conseil",
  "Autre demande",
];

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.nom.trim()) errors.nom = "Indiquez votre nom.";
  if (!values.email.trim()) errors.email = "Indiquez votre adresse e-mail.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "Cette adresse e-mail ne semble pas valide.";
  if (values.telephone.trim() && !/^[+()\d\s.-]{8,20}$/.test(values.telephone.trim()))
    errors.telephone = "Ce numéro ne semble pas valide.";
  if (values.message.trim().length < 10) errors.message = "Décrivez votre demande en quelques mots.";
  return errors;
}

/**
 * The site has no mail server: on submit the visitor’s mail client opens with the
 * message addressed to the firm and pre-filled. Nothing is stored or sent by the site.
 */
export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const id = (name: keyof Fields) => `${uid}-${name}`;
  const set = (name: keyof Fields) => (event: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [name]: event.target.value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      setSent(false);
      return;
    }
    const lines = [
      `Nom : ${values.prenom} ${values.nom}`.trim(),
      values.societe ? `Société : ${values.societe}` : "",
      `E-mail : ${values.email}`,
      values.telephone ? `Téléphone : ${values.telephone}` : "",
      "",
      values.message,
    ].filter((line, i, all) => line !== "" || all[i - 1] !== "");
    const subject = `Demande de contact : ${values.objet}`;
    const href = `mailto:${FIRM.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
    window.location.href = href;
  };

  const fieldProps = (name: keyof Fields) => ({
    id: id(name),
    name,
    value: values[name],
    onChange: set(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
  });

  const errorLine = (name: keyof Fields) => (
    <span id={`${id(name)}-error`} className="field__error" role={errors[name] ? "alert" : undefined}>
      {errors[name] ?? ""}
    </span>
  );

  return (
    <form className="form" noValidate onSubmit={onSubmit} aria-labelledby="form-title">
      <h2 id="form-title" className="heading field--full" style={{ fontSize: "var(--fs-h3)" }}>
        Écrire au cabinet
      </h2>

      <div className="field">
        <label htmlFor={id("nom")}>
          Nom<span className="req" aria-hidden="true">*</span>
        </label>
        <input {...fieldProps("nom")} autoComplete="family-name" required aria-required="true" />
        {errorLine("nom")}
      </div>

      <div className="field">
        <label htmlFor={id("prenom")}>Prénom</label>
        <input {...fieldProps("prenom")} autoComplete="given-name" />
        {errorLine("prenom")}
      </div>

      <div className="field">
        <label htmlFor={id("societe")}>Société</label>
        <input {...fieldProps("societe")} autoComplete="organization" />
        {errorLine("societe")}
      </div>

      <div className="field">
        <label htmlFor={id("email")}>
          E-mail<span className="req" aria-hidden="true">*</span>
        </label>
        <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" required aria-required="true" />
        {errorLine("email")}
      </div>

      <div className="field">
        <label htmlFor={id("telephone")}>Téléphone</label>
        <input {...fieldProps("telephone")} type="tel" autoComplete="tel" inputMode="tel" />
        {errorLine("telephone")}
      </div>

      <div className="field">
        <label htmlFor={id("objet")}>Objet</label>
        <select {...fieldProps("objet")}>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errorLine("objet")}
      </div>

      <div className="field field--full">
        <label htmlFor={id("message")}>
          Votre demande<span className="req" aria-hidden="true">*</span>
        </label>
        <textarea {...fieldProps("message")} rows={6} required aria-required="true" />
        {errorLine("message")}
      </div>

      {sent ? (
        <p className="form__status" role="status">
          Votre messagerie s’ouvre avec votre message pré-rempli : il ne reste qu’à l’envoyer. Si rien
          ne s’affiche, écrivez-nous directement à{" "}
          <a href={`mailto:${FIRM.email}`} style={{ textDecoration: "underline" }}>
            {FIRM.email}
          </a>
          .
        </p>
      ) : null}

      <div className="form__foot">
        <p className="form__note">
          Les champs marqués d’un astérisque sont obligatoires. L’envoi ouvre votre messagerie avec
          votre message adressé à {FIRM.email} ; le site ne conserve aucune donnée.
        </p>
        <button type="submit" className="cta-submit">
          Envoyer par e-mail
          <Arrow />
        </button>
      </div>
    </form>
  );
}
