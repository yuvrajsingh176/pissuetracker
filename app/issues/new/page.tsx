"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { VscBracketError } from "react-icons/vsc";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssuesschema } from "@/app/Validschema";
import { z } from "zod";
type IssueForm =  z.infer<typeof createIssuesschema>;
const NewIssuesPage = () => {
  const [error, setError] = useState("");
  const { register, control, handleSubmit ,formState:{errors}} = useForm<IssueForm>({
    resolver: zodResolver(createIssuesschema),
  });
  const router = useRouter();
  console.log(error);
  return (
    <div className="max-w-xl">
      {error.length > 0 && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <VscBracketError />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("Something unexpected happened");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
              </TextField.Root>
              {errors.title && <Text color="red" as="p">{ errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
              {errors.description && <Text color="red" as="p">{ errors.description.message}</Text>}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};
export default NewIssuesPage;
