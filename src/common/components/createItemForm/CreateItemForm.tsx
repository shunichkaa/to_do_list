import { AddBox } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { getFormContainerSx, getTextFieldSx } from "./CreateItemForm.styles";

interface Props {
    onCreateItem: (title: string) => void;
}

export const CreateItemForm = ({ onCreateItem }: Props) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const createItemHandler = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            onCreateItem(trimmedTitle);
            setTitle('');
        } else {
            setError('Title is required');
        }
    };

    return (
        <Box sx={getFormContainerSx()}>
            <TextField
                label="Enter a title"
                variant="outlined"
                value={title}
                size="small"
                error={!!error}
                helperText={error}
                sx={getTextFieldSx()}
                onChange={e => {
                    setTitle(e.currentTarget.value);
                    setError(null);
                }}
                onKeyDown={e => e.key === 'Enter' && createItemHandler()}
            />
            <IconButton onClick={createItemHandler} color="primary">
                <AddBox />
            </IconButton>
        </Box>
    );
};