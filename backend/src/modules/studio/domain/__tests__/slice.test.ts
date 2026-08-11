import { createComponent } from "../component";
import { createSlice } from "../slice";

describe("Slice", () => {
  it("should create a slice with valid data", () => {
    const component = createComponent({
      name: "Título",

      position: {
        x: 100,
        y: 100,
      },

      size: {
        width: 500,
        height: 100,
      },

      startTime: 0,
      endTime: 5,

      rotation: 0,
      opacity: 100,
      zIndex: 1,

      visible: true,
      locked: false,
      editable: true,

      block: {
        type: "TEXT",

        properties: {
          text: "StudioFlow",
          fontFamily: "Roboto",
          fontSize: 48,
          color: "#FFFFFF",
        },
      },
    });

    const slice = createSlice({
      name: "Cena 1",
      position: 0,
      duration: 10,
      background: {
        type: "COLOR",
        value: "#000000",
      },
      components: [component],
    });

    expect(slice.name).toBe("Cena 1");
    expect(slice.position).toBe(0);
    expect(slice.duration).toBe(10);
    expect(slice.components).toHaveLength(1);
  });
  it("should not allow negative position", () => {
    expect(() => {
        createSlice({
        name: "Cena inválida",
        position: -1,
        duration: 10,

        background: {
            type: "COLOR",
            value: "#000000",
        },

        components: [],
        });
    }).toThrow("Slice position cannot be negative");
    });
    it("should not allow duration equal to zero", () => {
    expect(() => {
        createSlice({
        name: "Cena inválida",
        position: 0,
        duration: 0,

        background: {
            type: "COLOR",
            value: "#000000",
        },

        components: [],
        });
    }).toThrow("Slice duration must be greater than zero");
    });
});