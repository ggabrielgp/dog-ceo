import { Chip } from "@mui/material";
import { Stack } from "@mui/material";

const ActiveFilters = () => {
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    return (
        <div className="d-inline-flex pt-2">
            <Stack direction="row" spacing={1}>
                <Chip size="small" label="Deletable" onDelete={handleDelete} />
                <Chip size="small" label="Deletable" variant="outlined" onDelete={handleDelete} />
            </Stack>

        </div>
    )
}

export default ActiveFilters