import Flex from "@/components/Flex";
import Checkbox from "@/components/UI/Checkbox";
import { BodyMRegular, BodySRegular } from "@/components/UI/Typography";
import { FC, FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

import { AnimatePresence as AP, motion as m } from "framer-motion";

import BotAvatar from "@icons/botAvatar.svg?react";
import BGShapes from "@/img/backgroundShapes.svg?react";
import SendIcon from "@icons/send.svg?react";
import GeminiIcon from "@icons/gemini.svg?react";
import DefaultAvatarIcon from "@icons/defaultAvatar.svg?react";

import { Button } from "@/components/UI/Button";
import { getChatCompletion } from "@/services/openai";
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai-edge";
import Loader from "@/components/Loader";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import useDeviceType from "@/hooks/useDeviceType";

type IMessage = { role: ChatCompletionRequestMessage["role"]; content: string };

const Chat: FC = () => {
	const [checkboxValue, setCheckboxValue] = useState<string[]>(["true"]);
	const [prompt, setPrompt] = useState<string>("");
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [messages, setMessages] = useState<IMessage[]>([{ role: "assistant", content: "Привет! Чем я могу помочь?" }]);
	const [isFetching, setIsFetching] = useState<boolean>(false);

	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const chatBodyRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [prompt]);

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSubmit();
		}
	};

	const handleSubmit = async () => {
		if (prompt.trim() === "") return;

		const newMessage: IMessage = { role: "user", content: prompt };

		setMessages([...messages, newMessage]);
		setPrompt("");

		try {
			setIsFetching(true);
			const responseMessage = await getChatCompletion(
				[...messages, newMessage].map((m) => ({ role: m.role, content: m.content }))
			);
			setMessages([...messages, newMessage, { role: "assistant", content: responseMessage }]);
		} catch (error) {
			console.error("Failed to fetch chat completion:", error);
		}

		setIsFetching(false);
	};

	const formSend = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleSubmit();
	};

	useEffect(() => {
		if (chatBodyRef.current) {
			chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
		}
	}, [messages]);

	const transitions = {
		initial: { opacity: 0, y: 40 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -40 },
	};
	const transitions2 = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	};

	const { isMobile } = useDeviceType();

	return (
		<div className="chat">
			<div className="chat__wrapper">
				<div className="chat__content">
					<div className="chat__header">
						<Flex $justifyContent="space-between" $flexWrap={isMobile} $gap={14}>
							<Flex $gap={12} $alignItems="center">
								<BotAvatar className="chat__bot-avatar" />
								<Flex $column $alignItems="start">
									<BodyMRegular>BotHub: ChatGPT & Midjourney</BodyMRegular>
									<BodySRegular color="var(--gray1)">bot</BodySRegular>
								</Flex>
							</Flex>
							<Checkbox
								textOrientation={isMobile ? "right" : "left"}
								state={checkboxValue}
								value="true"
								onClick={(value: string[]) => setCheckboxValue(value)}
							>
								<BodySRegular>Сохранить контекст</BodySRegular>
							</Checkbox>
						</Flex>
					</div>
					<div className="chat__body" ref={chatBodyRef}>
						<div className="chat__list">
							<AP mode="wait" initial={false}>
								{messages.map((msg, index) => (
									<m.div
										transition={{ ease: "easeInOut", duration: 0.5 }}
										key={index}
										className="chat-message-wrapper"
										{...transitions}
									>
										<ChatMessage {...msg} />
									</m.div>
								))}
							</AP>
						</div>
					</div>
					<AP mode="wait" initial={false}>
						{isFetching && (
							<m.div className="chat__loader" {...transitions2}>
								<Loader />
							</m.div>
						)}
					</AP>
					<form
						action="#"
						onClick={() => textareaRef.current?.focus()}
						onSubmit={formSend}
						className={`chat__input${isFocus ? " chat__input--focused" : ""}`}
					>
						<textarea
							rows={1}
							ref={textareaRef}
							value={prompt}
							onFocus={() => setIsFocus(true)}
							onBlur={() => setIsFocus(false)}
							onKeyDown={handleKeyDown}
							onChange={(event) => setPrompt(event.target.value)}
							placeholder=" Спроси о чем-нибудь..."
						/>
						<Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.stopPropagation()} $icon={<SendIcon />} />
					</form>
					<BGShapes className="chat__shapes"></BGShapes>
				</div>
			</div>
		</div>
	);
};

export default Chat;

interface ChatMessageProps {
	role: ChatCompletionRequestMessageRoleEnum;
	content: string;
}

const formatContent = (content: string) => {
	const parts = content.split(/```/);

	return parts.map((part, index) => {
		if (index % 2 === 0) {
			const formattedText = part
				.replace(/^(#{1,6})\s?/gm, "")
				.replace(/^\*\s?/gm, "")
				.replace(/^\d+\.\s?/gm, "")
				.replace(/(?:\*\*|__)(.*?)\1(?:\*\*|__)|(?:\*|_)(.*?)\1(?:\*|_)/g, "$1")
				.replace(/`{3}.*\n?|`{3}/g, "")
				.replace(/`(.*?)`/g, "$1")
				.replace(/^\s+|\s+$/g, "")
				.split("\n")
				.map((line, idx) => {
					if (line.trim() === "") {
						return <p key={idx} className="empty-line"></p>;
					}
					return <p key={idx}>{line}</p>;
				});

			return formattedText;
		} else {
			const language = parts[index].trim().split("\n")[0] || "text";

			return (
				<>
					<div className="chat-message__code-header">{language}</div>
					<SyntaxHighlighter
						codeTagProps={{ style: { borderRadius: "0 0 4px 4px" } }}
						key={index}
						language={language}
						style={oneDark}
					>
						{part.trim().split("\n").slice(1).join("\n")}
					</SyntaxHighlighter>
				</>
			);
		}
	});
};

const ChatMessage: FC<ChatMessageProps> = ({ content, role }) => {
	return (
		<div className={`chat-message${role === "user" ? " chat-message--right" : ""}`}>
			<div className="chat-message__picture">{role === "assistant" ? <GeminiIcon /> : <DefaultAvatarIcon />}</div>
			<div className="chat-message__content">
				{role === "assistant" && <BodyMRegular>Gemini</BodyMRegular>}
				<div className="chat-message__body">
					<BodyMRegular>{formatContent(content)}</BodyMRegular>
				</div>
			</div>
		</div>
	);
};
