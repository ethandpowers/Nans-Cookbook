import { createState } from '@hookstate/core'

const globalState = createState(
    {
        userDoc: null
    }
);

export default globalState;