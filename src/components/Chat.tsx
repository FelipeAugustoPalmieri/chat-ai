"use client";

import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { ScrollArea } from "./ui/scroll-area";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para o final quando novas mensagens chegam
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle>Support DataCrazy</CardTitle>
        <CardDescription>Crazy responde tudo oque você precisa</CardDescription>
      </CardHeader>
      <CardContent className="relative h-[400px]">
        <ScrollArea className="h-full w-full pr-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">Nenhuma mensagem</div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className="flex gap-3 text-slate-600 text-sm mb-4"
              >
                {message.role === "user" && (
                  <Avatar>
                    <AvatarFallback>FP</AvatarFallback>
                    <AvatarImage src="https://media.licdn.com/dms/image/v2/D4D03AQGftB--SprgJQ/profile-displayphoto-shrink_400_400/B4DZQVBAPyHwAg-/0/1735519372924?e=1743033600&v=beta&t=1hk-PgD0ELpls47JdvVW0CgjEys9YPE1xf5Lg54kL0U" />
                  </Avatar>
                )}
                {message.role === "assistant" && (
                  <Avatar>
                    <AvatarFallback>FP</AvatarFallback>
                    <AvatarImage src="https://dc-pppp3333pb.s3.amazonaws.com/companies/5d450c80-9b69-4acd-ac0c-e6b14d184089_2024-10-02T20%3A44%3A51.561Z" />
                  </Avatar>
                )}
                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-700">
                    {message.role === "user" ? "You" : "Assistant"}
                  </span>
                  {message.content}
                </p>
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="How can I help you?"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chat;
