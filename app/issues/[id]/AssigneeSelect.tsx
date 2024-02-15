"use client";
import { Select } from "@radix-ui/themes";
const AssigneSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Yuvraj Singh</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
export default AssigneSelect;
