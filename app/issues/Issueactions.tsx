'use client'
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssuestatusFilter";

const Issueactions = () => {
  return (
    <Flex className="mb-5 " justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};
export default Issueactions;
