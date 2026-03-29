const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const MAGENTA = "\x1b[35m";
const BLUE = "\x1b[34m";
const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";

export const yellow = (str: string | number) => `${YELLOW}${str}${RESET}`;
export const red = (str: string | number) => `${RED}${str}${RESET}`;
export const cyan = (str: string | number) => `${CYAN}${str}${RESET}`;
export const magenta = (str: string | number) => `${MAGENTA}${str}${RESET}`;
export const blue = (str: string | number) => `${BLUE}${str}${RESET}`;
export const bold = (str: string | number) => `${BOLD}${str}${RESET}`;
