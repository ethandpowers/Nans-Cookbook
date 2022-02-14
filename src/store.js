import { createState } from '@hookstate/core'

const globalState = createState(
    {
        userDocID: null,
    }
);

export default globalState;