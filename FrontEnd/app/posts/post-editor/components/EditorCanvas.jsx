import React, { forwardRef } from "react";

import {
  Canvas,
  Image as SkiaImage,
  ColorMatrix,
  CubicSampling,
} from "@shopify/react-native-skia";

const EditorCanvas = forwardRef(
  ({ image, width, height, matrix }, ref) => {
    if (!image) {
      return null;
    }

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
        >
          <ColorMatrix matrix={matrix} />
        </SkiaImage>
      </Canvas>
    );
  }
);

export default EditorCanvas;