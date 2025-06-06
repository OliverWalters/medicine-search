import { Typography } from "@mui/material";

export function SkeletonDrugInfoItem({ label }) {
    return (
       <Typography className='drug__info__data'>
           <span className='drug__info__label'>{label}</span> ...
       </Typography>
    );
}
