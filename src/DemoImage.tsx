import { Image } from "react-konva";
import { useImage } from "react-konva-utils";

export default function DemoImage({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const [demoImage] = useImage("demo_stamp.png");
  const scaleFactor = demoImage ? width / demoImage!.width : 1;
  return (
    <>
      {demoImage ? (
        <Image
          image={demoImage}
          width={demoImage.width * scaleFactor}
          height={demoImage.height * scaleFactor}
          y={(height - demoImage.height * scaleFactor) / 2}
          exludedFromExport={true}
          opacity={0.03}
          draggable={false}
          listening={false}
        ></Image>
      ) : null}
    </>
  );
}
