import { MdOutlineDeleteOutline } from "react-icons/md";

import { Button } from "@radix-ui/themes";
import Link from "next/link";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <div>
      <Button color="red" className="w-1/2 text-center cursor-pointer">
        <MdOutlineDeleteOutline />
        <Link href={`/issues/${issueId}/edit`}>Delete</Link>
      </Button>
    </div>
  );
};

export default DeleteIssueButton;
