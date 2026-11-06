import { depuracaoTopic } from "@/data/topics/depuracao";
import { logicaTopic } from "@/data/topics/logica";
import { pooTopic } from "@/data/topics/poo";
import { sintaxeTopic } from "@/data/topics/sintaxe";
import type { StudyTopic } from "@/types/study";

export const topics: StudyTopic[] = [logicaTopic, pooTopic, sintaxeTopic, depuracaoTopic];
