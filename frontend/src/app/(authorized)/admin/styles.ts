import { createStyles } from 'antd-style';

export const useStyles = createStyles(({css, cx}) => ({
    list: css`
        width: 800px;
    `,
    content: css`
        width: 100%;
        /* border: 1px solid red; */
        padding: 20px;
        background: white;
    `,
    right: css`
        width: 100%;
        /* border: 1px solid grey; */
        background: white;
    `,
    border: css`
        border: 1px solid blue;
    `,
    bgwhite: css`
        background: white;
    `,
    sticky: css`
        position: sticky;
        top: 0;
    `,
}));