import {
  createBlock,
  type TextBlockProperties,
  type ImageBlockProperties,
} from "../block";

describe("Block", () => {
  it("should create a TEXT block", () => {
    const properties: TextBlockProperties = {
      text: "Promoção",
      fontFamily: "Roboto",
      fontSize: 48,
      color: "#FFFFFF"
    };

    const block = createBlock({
      type: "TEXT",
      properties
    });

    expect(block.type).toBe("TEXT");

    expect(block.properties).toEqual({
      text: "Promoção",
      fontFamily: "Roboto",
      fontSize: 48,
      color: "#FFFFFF"
    });
  });
  it("should create an IMAGE block", () => {
    const properties: ImageBlockProperties = {
        src: "/uploads/banner.jpg",
        fit: "cover"
    };

    const block = createBlock({
        type: "IMAGE",
        properties
    });

    expect(block.type).toBe("IMAGE");

    expect(block.properties).toEqual({
        src: "/uploads/banner.jpg",
        fit: "cover"
    });
  });
});