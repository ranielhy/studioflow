import { createComponent } from "../component";

describe("Component", () => {
  it("should create a component with common properties", () => {
    const component = createComponent({
      name: "Título principal",

      position: {
        x: 100,
        y: 200
      },

      size: {
        width: 500,
        height: 100
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
          text: "Promoção",
          fontFamily: "Roboto",
          fontSize: 48,
          color: "#FFFFFF"
        }
      }
    });

    expect(component.name).toBe("Título principal");

    expect(component.position).toEqual({
      x: 100,
      y: 200
    });

    expect(component.size).toEqual({
      width: 500,
      height: 100
    });

    expect(component.block.type).toBe("TEXT");
  });
});