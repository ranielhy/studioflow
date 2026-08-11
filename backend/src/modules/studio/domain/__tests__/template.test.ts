import { createTemplate } from "../template";
import { createSlice } from "../slice";

describe("Template", () => {
  it("should create a template with valid data", () => {
    const slice = createSlice({
      name: "Cena 1",
      position: 0,
      duration: 10,

      background: {
        type: "COLOR",
        value: "#000000",
      },

      components: [],
    });

    const template = createTemplate({
      name: "Vídeo Institucional",
      description: "Template para vídeo institucional",

      mediaType: "VIDEO",
      status: "DRAFT",

      width: 1920,
      height: 1080,

      slices: [slice],
    });

    expect(template.name).toBe("Vídeo Institucional");
    expect(template.mediaType).toBe("VIDEO");
    expect(template.status).toBe("DRAFT");

    expect(template.width).toBe(1920);
    expect(template.height).toBe(1080);

    expect(template.slices).toHaveLength(1);
  });
  it("should not allow width equal to zero", () => {
    expect(() => {
      createTemplate({
        name: "Template inválido",

        mediaType: "IMAGE",
        status: "DRAFT",

        width: 0,
        height: 1080,

        slices: [],
      });
    }).toThrow(
      "Template width must be greater than zero",
    );
  });
  it("should not allow duplicated slice positions", () => {
    const slice1 = createSlice({
      name: "Cena 1",
      position: 0,
      duration: 10,

      background: {
        type: "COLOR",
        value: "#000000",
      },

      components: [],
    });

    const slice2 = createSlice({
      name: "Cena 2",
      position: 0,
      duration: 5,

      background: {
        type: "COLOR",
        value: "#FFFFFF",
      },

      components: [],
    });

    expect(() => {
      createTemplate({
        name: "Vídeo",

        mediaType: "VIDEO",
        status: "DRAFT",

        width: 1920,
        height: 1080,

        slices: [slice1, slice2],
      });
    }).toThrow(
      "Template cannot have duplicated slice positions",
    );
  });
});