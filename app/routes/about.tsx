import { Link } from "react-router";
import { PiShareNetworkFill } from "react-icons/pi";

export function meta() {
  return [
    { title: "About - v-noc" },
    { name: "description", content: "V-NOC: A graph-based IDE designed to eliminate the mental tax of modern software development" },
  ];
}

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <PiShareNetworkFill className="size-6 fill-green-600" />
            <span className="text-black">V-NOC</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            V‑NOC <span className="text-gray-500 font-normal">(Virtual Node Code)</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            <strong>V‑NOC is a graph‑based IDE designed to eliminate the mental tax of modern software development.</strong> We don't just help you write code; we manage the complexity that currently lives only in your head.
          </p>
        </section>

        {/* The Problem Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Problem: The "File" Bottleneck</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Modern development is trapped in a 50-year-old metaphor: the text file. Files store code as flat text, but they do not store <strong>intent, structure, or relationships.</strong> Because files are a "facade" with no real underlying map, everything else—logs, documentation, tasks, and discussions—becomes disorganized by default. There is no persistent connection between them. Today, a codebase only "makes sense" when a human or an LLM reads hundreds of files, holds them in memory, and manually builds a mental model.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This creates a <strong>Bottom-Up</strong> nightmare:
          </p>
          <ul className="list-disc text-gray-700 space-y-2 pl-6">
            <li>You must understand the small details just to see the big picture.</li>
            <li>Development becomes a "needle in a haystack" exercise.</li>
            <li>System knowledge is fragile—it lives in the head of the person who wrote the code, not in the system itself.</li>
          </ul>
        </section>

        {/* The Insight Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Insight: Compilers vs. Humans</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A compiler doesn't "guess" or "reason." It reads code once, builds a structured graph, and then accesses any part of the system instantly. It uses <strong>structure</strong>, not intelligence.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Humans and LLMs are currently forced to solve the structure problem and the reasoning problem at the same time. This is a massive waste of cognitive energy. We believe that most development friction is not an <strong>intelligence problem</strong>, but a <strong>structure problem</strong>. With the right structure, the "mental model" is provided by the computer, not built by the brain.
          </p>
        </section>

        {/* What V-NOC Does Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What V‑NOC Does: Building the Map</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            V‑NOC transforms your codebase from a collection of text files into a multidimensional knowledge graph.
          </p>
          
          <div className="space-y-8">
            {/* Persistent Identity */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Persistent Identity (Stable IDs)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We map your existing file hierarchy into a graph, giving every file, folder, function, and class a <strong>stable, unique ID.</strong>
              </p>
              <ul className="list-disc text-gray-700 space-y-2 mb-4 pl-6">
                <li><strong>Identity over Location:</strong> If you rename a file or move a function, its identity remains.</li>
                <li><strong>Anchored Data:</strong> Because the IDs are stable, your documentation, logs, and tasks are attached to the <em>logic</em>, not the <em>path</em>. When the code moves, the context moves with it.</li>
              </ul>
            </div>

            {/* Deep Extraction */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Deep Extraction & Dynamic Analysis</h3>
              <p className="text-gray-700 leading-relaxed">
                V‑NOC goes deeper than the file level. We extract every function and class as a first-class node. Through dynamic analysis, we build <strong>live call graphs</strong> that show exactly how data and logic flow through your system. You no longer have to "trace" calls manually; the connections are already live.
              </p>
            </div>

            {/* Semantic Groups */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Semantic Groups: Master Your Cognitive Load</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Even in a graph, a class with 50 functions or a folder with 100 files can become "visual noise." V-NOC allows you to create <strong>Virtual Groups</strong> to collapse this complexity into meaningful categories.
              </p>
              <ul className="list-disc text-gray-700 space-y-2 mb-4 pl-6">
                <li><strong>Logic over Syntax:</strong> You can take a set of functions—like <code className="bg-gray-100 px-1 rounded">create()</code>, <code className="bg-gray-100 px-1 rounded">update()</code>, <code className="bg-gray-100 px-1 rounded">get()</code>, and <code className="bg-gray-100 px-1 rounded">delete()</code>—and group them into a single node called <strong>"User CRUD."</strong></li>
                <li><strong>Non-Destructive Abstraction:</strong> These groups exist only in the V-NOC structural layer. They do not change your physical file structure or break your imports. You get the benefit of a clean, simplified view without the risk of "refactoring" the actual source code.</li>
                <li><strong>Layered Detail:</strong> You can treat a Group as a single object while navigating the high-level flow. When you need the details, you simply "step into" the group.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed italic">
                <em>Example:</em> Instead of seeing 20 individual API endpoint functions, you see one node labeled <strong>"Authentication Flow."</strong> You only see the 20 functions when you are actually working on Auth.
              </p>
            </div>
          </div>
        </section>

        {/* Working With Code Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Working With Code: The "Top-Down" Advantage</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When code is a graph, you stop <strong>collecting</strong> context and start <strong>eliminating</strong> it. V‑NOC allows you to navigate like a digital map: you start at the top and zoom in.
          </p>
          <ul className="list-disc text-gray-700 space-y-2 pl-6">
            <li><strong>Context Control:</strong> Isolate a single function or feature. Because V‑NOC understands the call graph, it automatically identifies all dependencies. You can hide everything irrelevant, working in a clean, isolated environment.</li>
            <li><strong>Scale Without Complexity:</strong> As the codebase grows, your mental load stays the same. You only ever see the logical flow of the task at hand. The computer handles the "mental model" of the surrounding system.</li>
            <li><strong>No More Context Switching:</strong> Information is stored where it originated. Documentation for a function lives <em>on</em> the function node. No searching, no tab-hunting.</li>
          </ul>
        </section>

        {/* Evolution of Runtime Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Evolution of Runtime: Structured Logs</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Logs should not be dumped into a "time-series pile" that no one wants to read. In V‑NOC, logs are structured and attached to the specific functions and call chains that generated them.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            When an error occurs, you don't just see a message; you see:
          </p>
          <ol className="list-decimal text-gray-700 space-y-2 mb-4 pl-6">
            <li>The exact function node where it happened.</li>
            <li>The full, visual call chain that led to the failure.</li>
            <li>The relevant documentation and history in the same view.</li>
          </ol>
          <p className="text-gray-700 leading-relaxed font-semibold">
            <strong>Debugging becomes a surgery, not an investigation.</strong>
          </p>
        </section>

        {/* Core Belief Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Belief</h2>
          <p className="text-xl text-gray-800 leading-relaxed font-medium">
            <strong>Anything that can be tracked by a computer should be.</strong> Today, we waste the world's most expensive resource—developer intelligence—on repetitive, mechanical tasks: finding files, rebuilding context, and mapping dependencies. These are computer problems, not human problems.
          </p>
          <p className="text-xl text-gray-800 leading-relaxed font-medium mt-4">
            V‑NOC handles the <strong>computation</strong> and <strong>structure</strong>, so that humans and LLMs can focus on <strong>reasoning</strong>.
          </p>
        </section>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
