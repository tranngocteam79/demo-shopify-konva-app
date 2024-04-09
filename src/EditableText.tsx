import { Text } from "react-konva";
import { useEffect, useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import { Html } from "react-konva-utils";
import EditableTextResize from "./EditableTextResize.tsx";
import EditableTextInput from "./EditableTextInput.tsx";
import { TextState } from "./store/textSlice.ts";
import { setTextValue, setDimensions, setPosition } from "./store/textSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store.ts";
import { toggleIsSelected } from "./store/appReducer.ts";

export default function EditableText({ text }: { text: TextState }) {
  const { isSelected, currentNodeId } = useSelector(
    (state: RootState) => state.app
  );
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue({ id: text.id, textValue: event.target.value });
  };

  // When select other node, disable editing mode in current node
  useEffect(() => {
    if (currentNodeId !== text.id) {
      setIsEditing(false);
    }
  }, [currentNodeId]);

  if (isSelected && currentNodeId === text.id && isEditing) {
    return <EditableTextInput text={text} setIsEditing={setIsEditing} />;
  }

  return (
    <>
      <EditableTextResize text={text} setIsEditing={setIsEditing} />
    </>
  );
}
