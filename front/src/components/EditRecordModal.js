import React from "react";
import { Avatar, Button, ButtonGroup, Modal, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import RequestURL from "../utils/RequestURL";

export const EditRecordModal = ({ record, close, onRecordUpdate }) => {
  const [title, setTitle] = useState(record.title);
  const [description, setDescription] = useState(record.description);

  const updateRecord = async () => {
    const updatedRecord = { title, description };
    const url = `${RequestURL}/${record.recordId}`;
    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecord),
      });
      const newRecord = { recordId: record.recordId, title, description };
      onRecordUpdate(newRecord);
      close();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <StyledModal open={true} onClose={close}>
        <Box width={440} height={300} bgcolor="white" p={3} borderRadius={5}>
          <Typography variant="h6" textAlign="center">
            Edit Record
          </Typography>
          <TextField
            sx={{ width: "100%", marginTop: "25px" }}
            label="Title"
            multiline
            maxRows={1}
            value={title}
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            sx={{ width: "100%", marginTop: "15px" }}
            label="Description"
            multiline
            maxRows={3}
            value={description}
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <ButtonGroup variant="contained" fullWidth sx={{ marginTop: "15px" }}>
            <Button disabled={title === "" || description === ""} onClick={updateRecord}>
              Update
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
