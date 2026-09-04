import React, {
  forwardRef,
} from "react";

import {
  Canvas,
  Image as SkiaImage,
  ColorMatrix,
  CubicSampling,
} from "@shopify/react-native-skia";

const EditorCanvas = forwardRef(
  (
    {
      image,
      width,
      height,
      matrix,
      rotation = 0,
      flipped = false,
    },
    ref
  ) => {
    if (
      !image ||
      !width ||
      !height
    ) {
      return null;
    }

    const centerX =
      width / 2;

    const centerY =
      height / 2;

    return (
      <Canvas
        ref={ref}
        style={{
          width,
          height,
        }}
      >
        <SkiaImage
          image={image}
          x={0}
          y={0}
          width={width}
          height={height}
          fit="cover"
          sampling={CubicSampling}
          transform={[
            {
              translateX:
                centerX,
            },
            {
              translateY:
                centerY,
            },
            {
              rotate:
                (rotation *
                  Math.PI) /
                180,
            },
            {
              scaleX:
                flipped ? -1 : 1,
            },
            {
              translateX:
                -centerX,
            },
            {
              translateY:
                -centerY,
            },
          ]}
        >
          <ColorMatrix
            matrix={matrix}
          />
        </SkiaImage>
      </Canvas>
    );
  }
);

export default EditorCanvas;