import InitPrompt from "@/components/InitPrompt";

export default function Home() {
  return (
    <main className="bg-ui-dark-gray text-white w-[405px] h-[700px] overflow-auto">
      <div className="flex justify-center items-center min-h-[700px]">
        <div className="absolute left-0  w-[405px]">
          <InitPrompt />
        </div>
      </div>
    </main>
  )
}
