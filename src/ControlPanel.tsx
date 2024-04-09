import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store/store.ts";
import {
  Button,
  Select,
  Flex,
  FormControl,
  FormLabel,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Center,
  SimpleGrid,
  Input,
} from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import { FaImage, FaCircle } from "react-icons/fa";
import { LiaPlusSolid, LiaMinusSolid } from "react-icons/lia";

import {
  addText,
  removeText,
  setTextValue,
  setFontSize,
  setFontColor,
  setFontStyle,
  setFontFamily,
  TextState,
} from "./store/textSlice";
import { nanoid } from "nanoid";
import { ImageState, changeImage, addImage } from "./store/imageSlice.ts";
import {
  addNewPage,
  setExportedDataImages,
  toggleIsSelected,
} from "./store/appReducer.ts";
import { templateTexts } from "./store/textSlice";
import { templateImages } from "./store/imageSlice.ts";
import { FONT_LISTS, SCENE_WIDTH } from "./util/constants.ts";

export default function ControlPanel({
  onScrollToEndOfStage,
}: {
  onScrollToEndOfStage: () => void;
}) {
  const text = useSelector(
    (state: RootState) =>
      state.text.data.find((text) => state.text.currentTextId === text.id) || {}
  ) as TextState;
  const { id, textValue, fontSize, fontColor, fontStyle, fontFamily } = text;
  const { pagesData, currentLayerId } = useSelector(
    (state: RootState) => state.app
  );

  const { currentNodeId } = useSelector((state: RootState) => state.app);
  const pagesRef = useSelector((state: RootState) => state.app.pagesRef);
  const dispatch = useDispatch<AppDispatch>();
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    isOpen: isOpenAddPagePanel,
    onOpen: onOpenAddPagePanel,
    onClose: onCloseAddPagePanel,
  } = useDisclosure();

  const handleOnImportImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const newImageUrl = URL.createObjectURL(event.target.files[0]);
        dispatch(changeImage({ id: currentNodeId!, imageUrl: newImageUrl }));
        event.target.files = null;
      }
    },
    [currentNodeId]
  );
  const handleOnClickFileRef = () => {
    if (fileRef.current !== null) {
      fileRef.current.click();
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setFontSize({ id: currentNodeId!, fontSize: parseInt(e.target.value) })
    );
  };

  const handleColorChange = (color: string) => {
    dispatch(setFontColor({ id: currentNodeId!, fontColor: color }));
  };

  const handleFontStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFontStyle({ id: currentNodeId!, fontStyle: e.target.value }));
  };
  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFontFamily({ id: currentNodeId!, fontFamily: e.target.value }));
  };

  const handleExportImage = () => {
    const ExportedUrlsData = pagesRef.map((pageRef) => {
      console.log("run ExportedUrlsData", pageRef);
      // @ts-ignore
      return pageRef.toDataURL()!;
    });
    dispatch(setExportedDataImages({ images: ExportedUrlsData }));
  };

  const handleAddTextBlock = () => {
    if (currentLayerId !== null) {
      const newText = {
        id: "txt" + nanoid(),
        textValue: "Click to resize and move, click one more to edit text",
        fontSize: 40,
        fontColor: "red",
        fontStyle: "normal",
        fontFamily: "Buffalo",
        pageId: currentLayerId,
        width: 600,
        height: 600,
        x: 50,
        y: 50,
      };
      dispatch(addText(newText));
    }
  };

  const handleDeleteTextBlock = () => {
    if (currentLayerId !== null) {
      dispatch(removeText(id));
    }
  };

  return (
    <div
      className={"control-panel"}
      style={{
        position: "sticky",
        top: 0,
        // left: "50%",
        // transform: "translateX(-50%)",
        zIndex: 1,
        background: "white",
        paddingInline: "10px",
        width: "90vw",
        maxWidth: SCENE_WIDTH + "px",
      }}
    >
      <Button
        onClick={() => {
          onOpenAddPagePanel();
          dispatch(
            toggleIsSelected({ nodeId: null, isSelected: false, layerId: null })
          );
        }}
      >
        Add page
      </Button>
      <Modal
        isOpen={isOpenAddPagePanel}
        onClose={onCloseAddPagePanel}
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent maxW="56rem">
          <ModalHeader>Select Page Template to Add</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              flexWrap="wrap"
              justifyContent={{ base: "center", md: "flex-start" }}
              mx={{ base: -2, md: 0 }}
            >
              {[...Array(6)].map((_, index) => (
                <Box
                  key={index}
                  width={{ base: "50%", md: "25%" }}
                  px={{ base: 2, md: 2 }}
                  py={2}
                  maxW={{ base: "50%", md: "25%" }}
                  onClick={() => {
                    const newPageIdx = pagesData[pagesData.length - 1].id + 1;
                    const templatePage = index + 1;
                    const newTexts = templateTexts
                      .filter((text) => text.pageId === templatePage)
                      .map((text) => ({
                        ...text,
                        pageId: newPageIdx,
                        id: "txt" + nanoid(),
                      }));
                    const newImages = templateImages
                      .filter((image) => image.pageId === templatePage)
                      .map((image) => ({
                        ...image,
                        pageId: newPageIdx,
                        id: "img" + nanoid(),
                      }));

                    dispatch(
                      addNewPage({ bgImageUrl: `page_${templatePage}.jpg` })
                    );
                    dispatch(addText(newTexts));
                    dispatch(addImage(newImages));
                    onCloseAddPagePanel();
                    setTimeout(() => {
                      onScrollToEndOfStage();
                    }, 200);
                  }}
                >
                  {/* Your item content goes here */}
                  <img
                    src={`./page_${index + 1}.jpg`}
                    alt={`Item ${index + 1}`}
                    style={{ width: "100%" }}
                  />
                </Box>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseAddPagePanel}>
              Close
            </Button>
            {/*<Button variant="ghost">Secondary Action</Button>*/}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex direction="row" marginTop={10} marginBottom={10} paddingBottom={5}>
        {currentNodeId?.startsWith("txt") ? (
          <Flex gap={"2"} width={"90%"} maxW={"1000px"} flexWrap={"wrap"}>
            <Box maxW={100}>
              <Flex flexDirection="column" alignItems="center">
                <FormLabel>Font Family</FormLabel>
                <Select onChange={handleFontFamilyChange} value={fontFamily}>
                  {FONT_LISTS &&
                    FONT_LISTS.map((font, idx) => (
                      <option
                        key={idx}
                        value={font}
                        style={{ fontFamily: font }}
                      >
                        {font}
                      </option>
                    ))}
                </Select>
              </Flex>
            </Box>
            <Box>
              <Flex flexDirection="column" alignItems="center">
                <FormLabel>Font Size</FormLabel>
                <Select
                  onChange={handleFontSizeChange}
                  value={fontSize + "px"}
                  variant="filled" // Set the variant to "filled" to enable custom styling
                  borderColor="tomato"
                >
                  <option value="30px">30px</option>
                  <option value="50px">50px</option>
                  <option value="70px">70px</option>
                  <option value="90px">90px</option>
                  <option value="110px">110px</option>
                </Select>
                <Flex gap="2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      dispatch(
                        setFontSize({
                          id: currentNodeId!,
                          fontSize: fontSize + 1,
                        })
                      )
                    }
                  >
                    <LiaPlusSolid />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      dispatch(
                        setFontSize({
                          id: currentNodeId!,
                          fontSize: fontSize - 1,
                        })
                      )
                    }
                  >
                    <LiaMinusSolid />
                  </Button>
                </Flex>
              </Flex>
            </Box>
            <Box>
              <Flex flexDirection="column" alignItems="center">
                <FormLabel>Font Color</FormLabel>
                <ColorPicker onFontColorChange={handleColorChange} />
              </Flex>
            </Box>
            <Box>
              <Flex flexDirection="column" alignItems="center">
                <FormLabel>Font Style</FormLabel>
                <Select onChange={handleFontStyleChange} value={fontStyle}>
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="italic">Italic</option>
                </Select>
              </Flex>
            </Box>
            <Flex gap={5} flexWrap={"wrap"}>
              <Box>
                <Button onClick={handleAddTextBlock}>Add Text Block</Button>
              </Box>
              <Box>
                <Button onClick={handleDeleteTextBlock}>
                  Delete Text Block
                </Button>
              </Box>
            </Flex>
          </Flex>
        ) : null}

        {currentNodeId?.startsWith("img") ? (
          <>
            <input
              type="file"
              ref={fileRef}
              onChange={handleOnImportImage}
              style={{ display: "none" }}
            />
            <Button
              variant="outline"
              onClick={handleOnClickFileRef}
              size="lg"
              leftIcon={<FaImage />}
            >
              Replace Image
            </Button>
          </>
        ) : null}
      </Flex>
    </div>
  );
}

function ColorPicker({
  onFontColorChange,
}: {
  onFontColorChange: (color: string) => void;
}) {
  const [color, setColor] = useState("gray.500");

  const colors = [
    "gray.500",
    "red.500",
    "gray.700",
    "green.500",
    "blue.500",
    "blue.800",
    "yellow.500",
    "orange.500",
    "purple.500",
    "pink.500",
    "white.500",
  ];

  return (
    <Popover variant="picker">
      <PopoverTrigger>
        <Button
          aria-label={color}
          background={color}
          height="22px"
          width="22px"
          padding={0}
          minWidth="unset"
          borderRadius={3}
        ></Button>
      </PopoverTrigger>
      <PopoverContent width="170px">
        <PopoverArrow bg={color} />
        <PopoverCloseButton color="white" />
        <PopoverHeader
          height="100px"
          backgroundColor={color}
          borderTopLeftRadius={5}
          borderTopRightRadius={5}
          color="white"
        >
          <Center height="100%">{color}</Center>
        </PopoverHeader>
        <PopoverBody height="120px">
          <SimpleGrid columns={5} spacing={2}>
            {colors.map((c) => (
              <Button
                border={"1px solid gray"}
                key={c}
                aria-label={c}
                background={c}
                height="22px"
                width="22px"
                padding={0}
                minWidth="unset"
                borderRadius={3}
                _hover={{ background: c }}
                onClick={() => {
                  onFontColorChange(c.split(".")[0]);
                }}
              ></Button>
            ))}
          </SimpleGrid>
          {/*<Input*/}
          {/*  borderRadius={3}*/}
          {/*  marginTop={3}*/}
          {/*  placeholder="red.100"*/}
          {/*  size="sm"*/}
          {/*  value={color}*/}
          {/*  onChange={(e) => {*/}
          {/*    setColor(e.target.value);*/}
          {/*  }}*/}
          {/*/>*/}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
