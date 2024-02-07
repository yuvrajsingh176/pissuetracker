"use client";
import { MdOutlineDeleteOutline } from "react-icons/md";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" className="w-1/2 text-center ">
            <MdOutlineDeleteOutline />
            Delete
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure You want to Delete? This action can't be undone.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
            <Button
  className="cursor-pointer"
  color="red"
  onClick={async () => {
    try {
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  }}
>
  Delete
</Button>

            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteIssueButton;
