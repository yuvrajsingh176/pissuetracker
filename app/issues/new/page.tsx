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
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
type IssueForm =  z.infer<typeof createIssuesschema>;
const NewIssuesPage = () => {
    const [error, setError] = useState("");
    const[isSubmitting,setSubmitting]=useState(false)
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
                setSubmitting(true)
            await axios.post("/api/issues", data);
            router.push("/issues");
            } catch (error) {
                setSubmitting(false)
            setError("Something unexpected happened");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
              </TextField.Root>
              {errors.title && <ErrorMessage>{ errors.title.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
              {errors.description && <ErrorMessage>{ errors.description.message}</ErrorMessage>}

        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
      </form>
    </div>
  );
};
export default NewIssuesPage;
