"use client"

import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { MailIcon } from "../components/MailIcon";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Card className="py-4 mt-20 w-[320px]">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h1 className="text-tiny uppercase font-bold">Sign in to Coinbase</h1>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Input
            className="!mt-10"
            type="email" label="Email" placeholder="Enter your email"
            labelPlacement="outside"
            startContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Button radius="full" className="mt-4 bg-blue-9 text-white font-bold">
            Continue
          </Button>
          <Button radius="full" className="mt-4 bg-grey-4 text-grey-9 font-semibold">
            Create account
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
