import { FIRM } from "../../lib/site";

/**
 * Situation plan drawn as hairlines (north up, not to scale): the stretch of
 * rue du Helder between boulevard des Italiens and boulevard Haussmann.
 */
export function ParisPlan() {
  return (
    <figure className="plan" style={{ margin: 0 }}>
      <svg viewBox="0 0 400 320" role="img" aria-labelledby="plan-title plan-desc">
        <title id="plan-title">Plan de situation du cabinet PRAXOR Audit</title>
        <desc id="plan-desc">
          Le cabinet se situe au 12 rue du Helder, entre le boulevard des Italiens et le boulevard
          Haussmann, à l’est de la rue de la Chaussée-d’Antin, dans le 9e arrondissement de Paris.
        </desc>

        <path className="plan__street plan__street--major" pathLength={1} d="M-10 70 L410 128" style={{ ["--d" as string]: "0ms" }} />
        <path className="plan__street plan__street--major" pathLength={1} d="M-10 250 L410 212" style={{ ["--d" as string]: "120ms" }} />
        <path className="plan__street" pathLength={1} d="M116 243 L104 -10" style={{ ["--d" as string]: "260ms" }} />
        <path className="plan__street" pathLength={1} d="M262 226 L254 -10" style={{ ["--d" as string]: "340ms" }} />
        <path className="plan__street plan__street--target" pathLength={1} d="M192 232 L188 98" style={{ ["--d" as string]: "520ms" }} />

        <text className="plan__label" transform="translate(276 104) rotate(7.9)">Bd Haussmann</text>
        <text className="plan__label" transform="translate(284 238) rotate(-5.2)">Bd des Italiens</text>
        <text className="plan__label" transform="translate(107 229) rotate(-87)">R. de la Chaussée-d’Antin</text>
        <text className="plan__label" transform="translate(251 84) rotate(-88)">Rue Taitbout</text>
        <text className="plan__label plan__label--target" transform="translate(184 222) rotate(-88)">Rue du Helder</text>
        <path d="M12 266.5 h14 M16 262.5 l-4 4 4 4" fill="none" style={{ stroke: "var(--mute)" }} strokeWidth="0.9" />
        <text className="plan__label" x="31" y="270">Opéra</text>

        <circle className="plan__ring" cx="197" cy="186" r="7" />
        <circle className="plan__pin" cx="197" cy="186" r="4.5" />
        <text className="plan__label plan__label--target" x="207" y="190">n° 12</text>

        <g className="plan__north" transform="translate(378 28)">
          <path d="M0 14 V-6 M-4 -1 L0 -7 L4 -1" stroke="currentColor" fill="none" strokeWidth="1" style={{ stroke: "var(--ink)" }} />
          <text x="-3.2" y="28">N</text>
        </g>
      </svg>
      <figcaption className="plan__caption mono">
        <span>Plan de situation</span>
        <span>{FIRM.coords}</span>
      </figcaption>
    </figure>
  );
}
