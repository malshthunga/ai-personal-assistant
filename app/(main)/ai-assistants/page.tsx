
"use client"
import React, {useState, useContext,useEffect} from 'react';
import { Button } from '@/components/ui/button';
import AiAssistantsList from '@/services/AiAssistantsList';
import Image  from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { BlurFade } from '@/components/magicui/blur-fade';
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useMutation,useConvex } from 'convex/react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { Loader } from 'lucide-react';
import { api } from '@/convex/_generated/api';
//create header for page

export type ASSISTANT=  {
    id: number;
    name: string;
    title: string;
    image: string;
    instruction: string;
    userInstruction: string;
    sampleQuestions: string[];
  };

function AIAssistants() {
  const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]);
  const [loading,setLoading] = useState(false);
  const insertAssistant=useMutation(api.userAiAssistants.InsertSelectedAssistants)
  const { user } = useContext(AuthContext);
  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      GetUserAssistants();
    }
  }, [user]);

  const GetUserAssistants = async () => {
    if (!user || !user._id) return; // Guard for safety
    const result = await convex.query(api.userAiAssistants.GetAllUserAssistants, {
      uid: user._id,
    });
    console.log(result);
    if (result.length > 0) {
      router.replace("/workspace");
      return;
    }
  };
  const onSelect = (assistant: ASSISTANT) => {
    const item = selectedAssistant.find((i) => i.id == assistant.id);
    if (item) {
      setSelectedAssistant((prev) => prev.filter((i) => i.id !== assistant.id));
      return;
    }
    setSelectedAssistant((prev)=> [...prev, assistant]);
  }
  const IsAssistantSelected = (assistant: ASSISTANT) =>
    selectedAssistant.some((i) => i.id === assistant.id);

  const OnClickContinue = async () => {
    if (!user || !user._id) {
      console.error("User ID not available");
      return;
    }
    setLoading(true);
    const result = await insertAssistant({
      records: selectedAssistant,
      uid: user._id,
    });
    setLoading(false);
    console.log(result);
  };

  return (
    <div className="px-10 mt-20 md:px-28 lg:px-36 xl:px-48">
      <div className="flex justify-between items-center">
        <div>
          {/* Adding animation to the text */}
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold">Welcome to the world of AI Assistants 🤖</h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className="text-xl mt-2">Choose your AI Companion to simplify your Task 🚀</p>
          </BlurFade>
        </div>
        <InteractiveHoverButton
          className="bg-gray-200 text-black px-4 py-2 rounded-full border hover:bg-gray-800 hover:text-white transition-all duration-300"
          disabled={selectedAssistant.length === 0 || loading}
          onClick={OnClickContinue}
        >
          {loading && <Loader className="animate-spin" />}
          Continue
        </InteractiveHoverButton>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {AiAssistantsList.map((assistant, index) => (
          <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
            <div
              key={index}
              className="hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer"
              onClick={() => onSelect(assistant)}
            >
              <Checkbox
                className="absolute m-2"
                checked={IsAssistantSelected(assistant)}
                onCheckedChange={() => onSelect(assistant)}
              />
              <Image
                src={assistant.image}
                alt={assistant.title}
                width={600}
                height={600}
                className="rounded-xl w-full h-[200px] object-cover"
              />
              <h2 className="text-center font-bold text-lg">{assistant.name}</h2>
              <h2 className="text-center text-gray-600 dark:text-gray">{assistant.title}</h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default AIAssistants;