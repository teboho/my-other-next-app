import { createStyles } from 'antd-style';

export const useStyles = createStyles(({css, cx}) => ({
    list: css`
        width: 800px;
    `,
    content: css`
        width: 100%;
        overflow-Y: auto;  
    `,
    right: css`
        width: 100%;
        /*border: 1px solid red;*/
        background: white;
    `,
    padding: css`
        padding: 20px;
    `,
    center: css`
        text-align: center;
    `,
    cardSize: css`
        height: 500px;
    `,
}));