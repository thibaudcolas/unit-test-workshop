import { Item, items as initialItems, update_quality } from "./gilded-roses";

let items = initialItems;

describe("Gilded Rose Solution", () => {
  describe("API", () => {
    // However, do not alter the Item class or Items property as those belong to the goblin
    it("has an Item constructor", () => {
      expect(Item).toBeInstanceOf(Function);
    });

    // - All items have a SellIn value which denotes the number of days we have to sell the item
    // - All items have a Quality value which denotes how valuable the item is
    it("gives three properties to each item", () => {
      const testItem = new Item("name", 10, 10);

      expect(testItem.name).toBe("name");
      expect(testItem.sell_in).toBe(10);
      expect(testItem.quality).toBe(10);
    });

    it("has an update function", () => {
      expect(update_quality).toBeInstanceOf(Function);
    });

    it("should set a global array", () => {
      expect(items instanceof Array).toBe(true);
    });

    it("should contain data", () => {
      expect(items.length).toBeGreaterThan(0);
    });

    it("is simply an array", () => {
      const oldLength = items.length;

      items.push(new Item("Test item", 5, 10));
      expect(items.length).toBe(oldLength + 1);
      items.pop();
      expect(items.length).toBe(oldLength);
    });
  });

  describe("value update", () => {
    // Reset global array before each test case.
    beforeEach(() => {
      items = [
        new Item("Test item", 10, 20),
        new Item("Test item 2", 2, 30),
        new Item("Test item 3", 5, 7),
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Aged Brie", 2, 0),
        new Item("Elixir of the Mongoose", 5, 7),
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Conjured Mana Cake", 3, 6)
      ];
    });

    it("never adds or removes items", () => {
      const length = items.length;

      update_quality(items);
      expect(items.length).toBe(length);
    });

    it("never alters item names", () => {
      const names = items.map(e => e.name);

      update_quality(items);

      for (let i = 0; i < items.length; i++) {
        expect(items[i].name).toBe(names[i]);
      }
    });

    // - At the end of each day our system lowers both values for every item
    it("lowers sell_in value each day", () => {
      const sell_in = items[0].sell_in;

      update_quality(items);
      expect(items[0].sell_in).toBeLessThan(sell_in);
    });

    // - At the end of each day our system lowers both values for every item
    it("lowers quality value each day", () => {
      const quality = items[0].quality;

      update_quality(items);
      expect(items[0].quality).toBeLessThan(quality);
    });
  });

  describe("common cases", () => {
    beforeEach(() => {
      items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Aged Brie", 2, 0),
        new Item("Elixir of the Mongoose", 5, 7),
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Conjured Mana Cake", 3, 6)
      ];
    });

    it("can have a smaller sell_in than 0", () => {
      for (let i = 0; i < items[0].sell_in + 20; i++) {
        update_quality(items);
      }

      expect(items[0].sell_in).toBeLessThan(0);
    });

    // - The Quality of an item is never negative
    it("cannot have a smaller quality than 0", () => {
      for (let i = 0; i < items[0].quality + 20; i++) {
        update_quality(items);
      }

      expect(items[0].quality).toBe(0);
    });

    // - Once the sell by date has passed, Quality degrades twice as fast
    it("degrades its quality twice as fast when sell_in is below 0", () => {
      items.push(new Item("low quality test", 0, 10));
      update_quality(items);
      expect(items[items.length - 1].quality).toBe(8);
    });

    // - The Quality of an item is never more than 50
    it("cannot have a quality greater than 50", () => {
      for (let i = 0; i < 100; i++) {
        update_quality(items);
      }

      expect(items[1].quality).toBe(50);
    });
  });

  describe("special cases", () => {
    beforeEach(() => {
      items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Aged Brie", 2, 0),
        new Item("Elixir of the Mongoose", 5, 7),
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Conjured Mana Cake", 3, 6)
      ];
    });

    // - 'Aged Brie' actually increases in Quality the older it gets
    it("increases quality for Aged Brie", () => {
      let quality = 0;

      expect(items[1].name).toMatch(/^Aged*/);

      for (let i = 0; i < 20; i++) {
        quality = items[1].quality;
        update_quality(items);
        expect(items[1].quality).toBeGreaterThan(quality);
      }
    });

    // - 'Sulfuras', being a legendary item, never has to be sold or decreases in Quality
    it("does not update quality for Sulfuras", () => {
      let quality = 0;

      expect(items[3].name).toMatch(/^Sulfuras*/);

      for (let i = 0; i < 20; i++) {
        quality = items[3].quality;
        update_quality(items);
        expect(items[3].quality).toBe(quality);
      }
    });

    // - 'Backstage passes', like aged brie, increases in Quality as it's SellIn value approaches;
    it("increases quality for Backstage passes", () => {
      let quality = 0;

      expect(items[4].name).toMatch(/^Backstage*/);

      for (let i = 0; i < 3; i++) {
        quality = items[4].quality;
        update_quality(items);
        expect(items[4].quality).toBeGreaterThan(quality);
      }
    });

    // Quality increases by 2 when there are 10 days or less
    it("increases faster (by 2) when the concert approaches", () => {
      let quality = 0;

      expect(items[4].name).toMatch(/^Backstage*/);

      for (let i = 0; i < 5; i++) {
        update_quality(items);
      }

      for (let j = 0; j < 5; j++) {
        quality = items[4].quality;
        update_quality(items);
        expect(items[4].quality).toBe(quality + 2);
      }
    });

    // and by 3 when there are 5 days or less
    it("increases even faster (by 3) when the concert approaches", () => {
      let quality = 0;

      expect(items[4].name).toMatch(/^Backstage*/);

      for (let i = 0; i < 10; i++) {
        update_quality(items);
      }

      for (let j = 0; j < 5; j++) {
        quality = items[4].quality;
        update_quality(items);
        expect(items[4].quality).toBe(quality + 3);
      }
    });

    // but Quality drops to 0 after the concert
    it("drops to 0 when the concert is over", () => {
      expect(items[4].name).toMatch(/^Backstage*/);

      for (let i = 0; i < 16; i++) {
        update_quality(items);
      }

      expect(items[4].quality).toBe(0);
    });

    // - 'Conjured' items degrade in Quality twice as fast as normal items
    it.skip("degrades twice as fast if conjured", () => {
      const quality = items[5].quality;

      expect(items[5].name).toMatch(/^Conjured*/);

      update_quality(items);
      expect(items[5].quality).toBe(quality - 2);
    });
  });
});
