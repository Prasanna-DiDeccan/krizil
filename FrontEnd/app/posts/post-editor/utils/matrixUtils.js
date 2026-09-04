// export const identityMatrix = () => [
//   1, 0, 0, 0, 0,
//   0, 1, 0, 0, 0,
//   0, 0, 1, 0, 0,
//   0, 0, 0, 1, 0,
// ];

// export const brightnessMatrix = (value) => [
//   1, 0, 0, 0, value,
//   0, 1, 0, 0, value,
//   0, 0, 1, 0, value,
//   0, 0, 0, 1, 0,
// ];

// export const contrastMatrix = (value) => {
//   const factor = value + 1;
//   const offset = 0.5 * (1 - factor);

//   return [
//     factor, 0, 0, 0, offset,
//     0, factor, 0, 0, offset,
//     0, 0, factor, 0, offset,
//     0, 0, 0, 1, 0,
//   ];
// };

// export const saturationMatrix = (value) => {
//   const saturation = value + 1;

//   const lumR = 0.213;
//   const lumG = 0.715;
//   const lumB = 0.072;

//   const inverse = 1 - saturation;

//   const r = inverse * lumR;
//   const g = inverse * lumG;
//   const b = inverse * lumB;

//   return [
//     r + saturation,
//     g,
//     b,
//     0,
//     0,

//     r,
//     g + saturation,
//     b,
//     0,
//     0,

//     r,
//     g,
//     b + saturation,
//     0,
//     0,

//     0,
//     0,
//     0,
//     1,
//     0,
//   ];
// };

// export const warmthMatrix = (value) => {
//   return [
//     1 + value * 0.15,
//     0,
//     0,
//     0,
//     0,

//     0,
//     1 + value * 0.04,
//     0,
//     0,
//     0,

//     0,
//     0,
//     1 - value * 0.15,
//     0,
//     0,

//     0,
//     0,
//     0,
//     1,
//     0,
//   ];
// };

// export const multiplyMatrices = (a, b) => {
//   const result = new Array(20).fill(0);

//   for (let row = 0; row < 4; row++) {
//     for (let col = 0; col < 5; col++) {
//       let value = 0;

//       for (let k = 0; k < 4; k++) {
//         value +=
//           a[row * 5 + k] *
//           b[k * 5 + col];
//       }

//       if (col === 4) {
//         value += a[row * 5 + 4];
//       }

//       result[row * 5 + col] = value;
//     }
//   }

//   return result;
// };

export const identityMatrix = () => [
  1, 0, 0, 0, 0,

  0, 1, 0, 0, 0,

  0, 0, 1, 0, 0,

  0, 0, 0, 1, 0,
];

// ============================================================
// BRIGHTNESS
// ============================================================

export const brightnessMatrix = (
  value
) => {
  return [
    1, 0, 0, 0, value,

    0, 1, 0, 0, value,

    0, 0, 1, 0, value,

    0, 0, 0, 1, 0,
  ];
};

// ============================================================
// CONTRAST
// ============================================================

export const contrastMatrix = (
  value
) => {
  const factor =
    1 + value;

  const offset =
    0.5 *
    (1 - factor);

  return [
    factor, 0, 0, 0, offset,

    0, factor, 0, 0, offset,

    0, 0, factor, 0, offset,

    0, 0, 0, 1, 0,
  ];
};

// ============================================================
// SATURATION
// ============================================================

export const saturationMatrix = (
  value
) => {
  const saturation =
    1 + value;

  const lumR =
    0.213;

  const lumG =
    0.715;

  const lumB =
    0.072;

  const inverse =
    1 - saturation;

  const r =
    inverse * lumR;

  const g =
    inverse * lumG;

  const b =
    inverse * lumB;

  return [
    r + saturation,
    g,
    b,
    0,
    0,

    r,
    g + saturation,
    b,
    0,
    0,

    r,
    g,
    b + saturation,
    0,
    0,

    0,
    0,
    0,
    1,
    0,
  ];
};

// ============================================================
// WARMTH
// ============================================================

export const warmthMatrix = (
  value
) => {
  return [
    1 + value * 0.15,
    0,
    0,
    0,
    0,

    0,
    1 + value * 0.04,
    0,
    0,
    0,

    0,
    0,
    1 - value * 0.15,
    0,
    0,

    0,
    0,
    0,
    1,
    0,
  ];
};

// ============================================================
// MATRIX MULTIPLICATION
// ============================================================

export const multiplyMatrices = (
  a,
  b
) => {
  const result =
    new Array(20).fill(0);

  for (
    let row = 0;
    row < 4;
    row++
  ) {
    for (
      let col = 0;
      col < 5;
      col++
    ) {
      let value = 0;

      for (
        let k = 0;
        k < 4;
        k++
      ) {
        value +=
          a[row * 5 + k] *
          b[k * 5 + col];
      }

      if (col === 4) {
        value +=
          a[row * 5 + 4];
      }

      result[
        row * 5 + col
      ] = value;
    }
  }

  return result;
};