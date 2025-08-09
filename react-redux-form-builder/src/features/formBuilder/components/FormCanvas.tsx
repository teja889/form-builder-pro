import { Paper, Typography, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  removeField,
  setSelectedField,
  reorderFields,
} from "../formBuilderSlice";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type OnDragEndResponder,
} from "react-beautiful-dnd";

export const FormCanvas = () => {
  const { fields, selectedFieldId } = useAppSelector(
    (state) => state.formBuilder
  );
  const dispatch = useAppDispatch();

  const handleRemoveField = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    dispatch(removeField({ id }));
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    dispatch(
      reorderFields({
        startIndex: result.source.index,
        endIndex: result.destination.index,
      })
    );
  };

  return (
    <Paper elevation={2} sx={{ p: 3, minHeight: "70vh" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Form Canvas
      </Typography>
      {fields.length === 0 ? (
        <Typography color="text.secondary">
          Add fields from the left panel to begin.
        </Typography>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="canvas-fields">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((field, index) => (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(provided) => (
                      <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        variant="outlined"
                        onClick={() =>
                          dispatch(setSelectedField({ id: field.id }))
                        }
                        sx={{
                          p: 2,
                          mb: 2,
                          cursor: "pointer",
                          borderColor:
                            field.id === selectedFieldId
                              ? "primary.main"
                              : "rgba(0, 0, 0, 0.12)",
                          borderWidth: field.id === selectedFieldId ? 2 : 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <span {...provided.dragHandleProps}>
                          <DragIndicatorIcon sx={{ color: "text.secondary" }} />
                        </span>
                        <Box
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography>
                            <strong>{field.label}</strong> ({field.type})
                          </Typography>
                          <IconButton
                            aria-label="delete field"
                            onClick={(e) => handleRemoveField(e, field.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Paper>
  );
};
