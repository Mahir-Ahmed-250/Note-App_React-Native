import { colors } from "../theme/colors";
import { typography } from "../theme/typography";

const BASE = {
    fontFamily: typography.primary,
    fontSize: 26
}

const BASE_BOLD = {
    fontFamily: typography.primaryBold,
    fontSize: 26,
    color: colors.black
}

const BOLD = {
    fontFamily: typography.bold,
    color: colors.black
}

export const presets = {
    default: BASE,
    bold: BOLD,
    h1: {
        ...BOLD,
        fontSize: 32
    },
    h2: {
        ...BOLD,
        fontSize: 28
    },
    h3: {
        ...BASE_BOLD,
        fontSize: 26
    },
    h4: {
        ...BASE_BOLD,
        fontSize: 18
    },
    h5: {
        ...BASE_BOLD,
        fontSize: 21
    },

    small: {
        ...BASE,
        fontSize: 12
    }
}