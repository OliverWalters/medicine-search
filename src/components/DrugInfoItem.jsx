import { Typography } from "@mui/material";
export function DrugInfoItem({ label, value }) {
    return (
        value && <Typography className='drug__info__data'><span className='drug__info__label'>{label}</span> {value}</Typography>
    );
}
