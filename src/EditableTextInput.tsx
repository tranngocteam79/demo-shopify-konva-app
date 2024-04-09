import { Html } from "react-konva-utils";
import { KeyboardEventHandler } from "react";
import { Button, Flex, Select } from "@chakra-ui/react";
import { TextState, setTextValue } from "./store/textSlice.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store.ts";

const RETURN_KEY = "Enter";
const ESCAPE_KEY = "Escape";
function getStyle(text: TextState) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${text.width}px`,
    height: `${text.height + 20}px`,
    border: "none",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    color: text.fontColor,
    fontSize: text.fontSize + "px",
    fontFamily: text.fontFamily,
    fontWeight: text.fontStyle,
    lineHeight: "1em",
    OverflowY: "hidden",
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    marginTop: "-4px",
  };
}

interface EditableTextInputProps {
  text: TextState;
  setIsEditing: (isEditing: boolean) => void;
}

export default function EditableTextInput({
  text,
  setIsEditing,
}: EditableTextInputProps) {
  const { x, y, textValue, width, height, pageId } = text;
  const dispatch = useDispatch<AppDispatch>();
  function handleEscapeKeys(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      (event.code === RETURN_KEY && !event.shiftKey) ||
      event.code === ESCAPE_KEY
    ) {
      setIsEditing(false);
    }
  }

  const handleOnChangeText = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setTextValue({ id: text.id, textValue: event.target.value }));
    ("");
  };

  const style = getStyle(text);
  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
        value={textValue}
        style={style}
        onChange={handleOnChangeText}
        onKeyDown={handleEscapeKeys}
      />
    </Html>
  );
}
