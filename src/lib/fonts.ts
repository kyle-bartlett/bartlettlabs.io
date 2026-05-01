import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

const interResult = loadInter();
const jetBrainsResult = loadJetBrainsMono();
const montserratResult = loadMontserrat();

export const interFamily = interResult.fontFamily;
export const jetBrainsFamily = jetBrainsResult.fontFamily;
export const montserratFamily = montserratResult.fontFamily;

export const fontInter = `${interFamily}, 'SF Pro Display', system-ui, sans-serif`;
export const fontMono = `${jetBrainsFamily}, 'SF Mono', monospace`;
export const fontMontserrat = `${montserratFamily}, 'SF Pro Display', system-ui, sans-serif`;
