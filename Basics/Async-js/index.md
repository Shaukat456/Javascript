{/_ ============================================================
ASYNC JAVASCRIPT — FROM ZERO TO CONFIDENT
A beginner-friendly visual guide
============================================================ _/}

import { useState, useEffect, useRef } from "react";

export const CallStackVisual = () => {
const [step, setStep] = useState(0);
const steps = [
{
label: "Program starts",
stack: [],
heap: ["greet = function", "name = 'Alice'"],
output: [],
highlight: null,
code: `const name = "Alice";\nfunction greet(n) {\n  return "Hello, " + n;\n}\nconsole.log(greet(name));`,
explain: "The program starts. Variables and functions are stored in the Heap (memory).",
},
{
label: "main() pushed",
stack: ["main()"],
heap: ["greet = function", "name = 'Alice'"],
output: [],
highlight: "main()",
code: `→ const name = "Alice";\nfunction greet(n) {\n  return "Hello, " + n;\n}\nconsole.log(greet(name));`,
explain: "JavaScript creates a Global Execution Context (think of it as 'main') and pushes it to the call stack.",
},
{
label: "greet() called",
stack: ["main()", "greet('Alice')"],
heap: ["greet = function", "name = 'Alice'"],
output: [],
highlight: "greet('Alice')",
code: `const name = "Alice";\nfunction greet(n) {\n  return "Hello, " + n;\n}\n→ console.log(greet(name));`,
explain: "greet(name) is called. A new Execution Context is created for greet() and pushed on top of the stack.",
},
{
label: "greet() returns",
stack: ["main()", 'console.log("Hello, Alice")'],
heap: ["greet = function", "name = 'Alice'"],
output: [],
highlight: 'console.log("Hello, Alice")',
code: `const name = "Alice";\nfunction greet(n) {\n→  return "Hello, " + n;\n}\nconsole.log(greet(name));`,
explain: "greet() finishes and is popped off the stack. Its return value is passed to console.log().",
},
{
label: "Output printed",
stack: ["main()"],
heap: ["greet = function", "name = 'Alice'"],
output: ["Hello, Alice"],
highlight: null,
code: `const name = "Alice";\nfunction greet(n) {\n  return "Hello, " + n;\n}\n→ console.log(greet(name));`,
explain: "console.log() runs, prints to output, then is popped. We're back to main().",
},
{
label: "Program done",
stack: [],
heap: ["greet = function", "name = 'Alice'"],
output: ["Hello, Alice"],
highlight: null,
code: `const name = "Alice";\nfunction greet(n) {\n  return "Hello, " + n;\n}\nconsole.log(greet(name)); ✓`,
explain: "All code has executed. The call stack is empty. Program complete!",
},
];

const s = steps[step];

return (
<div style={{ fontFamily: "monospace", background: "var(--color-background-secondary)", borderRadius: 12, padding: 24, margin: "20px 0" }}>
<div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
<span style={{ fontFamily: "sans-serif", fontWeight: 500, fontSize: 14, color: "var(--color-text-secondary)" }}>
Step {step + 1} / {steps.length}: {s.label}
</span>
</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
        {/* Call Stack */}
        <div>
          <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>📚 Call Stack</div>
          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 8, minHeight: 120, display: "flex", flexDirection: "column-reverse", justifyContent: "flex-start", padding: 8, gap: 4 }}>
            {s.stack.length === 0 && (
              <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", textAlign: "center", padding: "20px 0", fontFamily: "sans-serif" }}>empty</div>
            )}
            {s.stack.map((frame, i) => (
              <div key={i} style={{
                background: frame === s.highlight ? "#EAF3DE" : "var(--color-background-secondary)",
                color: frame === s.highlight ? "#3B6D11" : "var(--color-text-primary)",
                border: frame === s.highlight ? "1px solid #639922" : "0.5px solid var(--color-border-tertiary)",
                borderRadius: 6, padding: "6px 10px", fontSize: 12,
                transition: "all 0.3s ease",
                fontWeight: frame === s.highlight ? 500 : 400
              }}>{frame}</div>
            ))}
          </div>
        </div>

        {/* Code */}
        <div>
          <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>📄 Code</div>
          <div style={{ background: "#1e1e2e", borderRadius: 8, padding: 10, minHeight: 120 }}>
            {s.code.split("\n").map((line, i) => (
              <div key={i} style={{
                fontSize: 11, lineHeight: 1.7,
                color: line.startsWith("→") ? "#F9CB42" : "#cdd6f4",
                background: line.startsWith("→") ? "rgba(249,203,66,0.1)" : "transparent",
                borderRadius: 3, padding: "0 4px"
              }}>{line}</div>
            ))}
          </div>
        </div>

        {/* Heap & Output */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>🧠 Heap (Memory)</div>
            <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 8, padding: 8, minHeight: 60 }}>
              {s.heap.map((item, i) => (
                <div key={i} style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.8 }}>· {item}</div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>🖥️ Output</div>
            <div style={{ background: "#1e1e2e", borderRadius: 8, padding: 8, minHeight: 40 }}>
              {s.output.map((line, i) => (
                <div key={i} style={{ fontSize: 11, color: "#a6e3a1" }}>{line}</div>
              ))}
              {s.output.length === 0 && <span style={{ fontSize: 11, color: "#585b70" }}>—</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "#EAF3DE", border: "0.5px solid #C0DD97", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: "#3B6D11", fontFamily: "sans-serif" }}>💡 {s.explain}</span>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ padding: "8px 16px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-primary)", cursor: step === 0 ? "not-allowed" : "pointer", opacity: step === 0 ? 0.4 : 1, fontSize: 13 }}>← Prev</button>
        <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1} style={{ padding: "8px 16px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-primary)", cursor: step === steps.length - 1 ? "not-allowed" : "pointer", opacity: step === steps.length - 1 ? 0.4 : 1, fontSize: 13 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ padding: "8px 16px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-secondary)", cursor: "pointer", fontSize: 13, marginLeft: "auto" }}>↺ Reset</button>
      </div>
    </div>

);
};

export const EventLoopVisual = () => {
const [running, setRunning] = useState(false);
const [step, setStep] = useState(-1);
const intervalRef = useRef(null);

const sequence = [
{ callStack: ["console.log('Start')"], callbackQueue: [], webApis: [], output: ["Start"], explain: "console.log('Start') is synchronous — runs immediately, prints 'Start', then is removed from the stack." },
{ callStack: ["setTimeout(fn, 2000)"], callbackQueue: [], webApis: ["⏱ Timer: 2000ms (fn)"], output: ["Start"], explain: "setTimeout() is called. The timer is handed off to the Browser's Web API. JavaScript does NOT wait. The call stack is now free!" },
{ callStack: ["console.log('End')"], callbackQueue: [], webApis: ["⏱ Timer: 2000ms (fn)"], output: ["Start", "End"], explain: "JavaScript immediately continues to the next line. console.log('End') runs. Timer is still ticking in the background." },
{ callStack: [], callbackQueue: [], webApis: ["⏱ Timer: running... (fn)"], output: ["Start", "End"], explain: "The call stack is now empty. JavaScript is idle — but the timer is still running in the Web API zone." },
{ callStack: [], callbackQueue: ["fn() — timer done!"], webApis: [], output: ["Start", "End"], explain: "Timer expires! The callback (fn) moves to the Callback Queue, waiting for its turn." },
{ callStack: ["fn() ← Event Loop pushed this"], callbackQueue: [], webApis: [], output: ["Start", "End"], explain: "The Event Loop sees: call stack is empty + queue has a job. It pushes fn() onto the call stack." },
{ callStack: ["console.log('Timeout!')"], callbackQueue: [], webApis: [], output: ["Start", "End", "Timeout!"], explain: "fn() runs — printing 'Timeout!'. This is why async callbacks run after synchronous code, even with a 0ms timer." },
{ callStack: [], callbackQueue: [], webApis: [], output: ["Start", "End", "Timeout!"], explain: "All done! The key insight: JavaScript is single-threaded, but offloads waiting work to the browser's Web APIs." },
];

useEffect(() => {
if (running) {
intervalRef.current = setInterval(() => {
setStep(prev => {
if (prev >= sequence.length - 1) { setRunning(false); return prev; }
return prev + 1;
});
}, 1600);
}
return () => clearInterval(intervalRef.current);
}, [running]);

const s = step >= 0 ? sequence[step] : { callStack: [], callbackQueue: [], webApis: [], output: [], explain: "Press Play to watch the Event Loop in action!" };

const code = `console.log('Start');

setTimeout(() => {
console.log('Timeout!');
}, 2000);

console.log('End');`;

return (
<div style={{ background: "var(--color-background-secondary)", borderRadius: 12, padding: 24, margin: "20px 0", fontFamily: "monospace" }}>
<div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 16 }}>
Interactive Event Loop — watch how async works
</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        {/* Left column: Code */}
        <div>
          <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>Code</div>
          <div style={{ background: "#1e1e2e", borderRadius: 8, padding: 12, fontSize: 12, lineHeight: 2, color: "#cdd6f4" }}>
            {code.split("\n").map((line, i) => <div key={i}>{line || <br />}</div>)}
          </div>
        </div>

        {/* Right column: Output */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>🖥️ Console Output</div>
            <div style={{ background: "#1e1e2e", borderRadius: 8, padding: 12, minHeight: 80 }}>
              {s.output.map((line, i) => <div key={i} style={{ fontSize: 12, color: "#a6e3a1", lineHeight: 1.8 }}>{line}</div>)}
              {s.output.length === 0 && <span style={{ color: "#585b70", fontSize: 12 }}>—</span>}
            </div>
          </div>

          {/* Web APIs */}
          <div>
            <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>🌐 Web APIs (Browser)</div>
            <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 8, padding: 8, minHeight: 44 }}>
              {s.webApis.map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: "#7F77DD", background: "#EEEDFE", borderRadius: 6, padding: "4px 8px", display: "inline-block" }}>{item}</div>
              ))}
              {s.webApis.length === 0 && <span style={{ color: "var(--color-text-tertiary)", fontSize: 12 }}>idle</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Call Stack & Queue */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>📚 Call Stack</div>
          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 8, minHeight: 80, display: "flex", flexDirection: "column-reverse", padding: 8, gap: 4 }}>
            {s.callStack.map((frame, i) => (
              <div key={i} style={{ background: "#EAF3DE", color: "#3B6D11", border: "0.5px solid #C0DD97", borderRadius: 6, padding: "6px 10px", fontSize: 12 }}>{frame}</div>
            ))}
            {s.callStack.length === 0 && <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", textAlign: "center", padding: "16px 0", fontFamily: "sans-serif" }}>empty</div>}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 6, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>📬 Callback Queue</div>
          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 8, minHeight: 80, padding: 8 }}>
            {s.callbackQueue.map((item, i) => (
              <div key={i} style={{ background: "#FAEEDA", color: "#633806", border: "0.5px solid #FAC775", borderRadius: 6, padding: "6px 10px", fontSize: 12 }}>{item}</div>
            ))}
            {s.callbackQueue.length === 0 && <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", textAlign: "center", padding: "16px 0", fontFamily: "sans-serif" }}>empty</div>}
          </div>
        </div>
      </div>

      {/* Event Loop Arrow indicator */}
      <div style={{ textAlign: "center", fontSize: 12, color: "var(--color-text-secondary)", fontFamily: "sans-serif", marginBottom: 12 }}>
        {step === 5 ? "🔄 Event Loop: stack empty + queue has job → moving callback to stack!" : "🔄 Event Loop: watching call stack and callback queue..."}
      </div>

      {/* Explain box */}
      <div style={{ background: "#E6F1FB", border: "0.5px solid #B5D4F4", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: "#042C53", fontFamily: "sans-serif" }}>💡 {s.explain}</span>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => { setStep(-1); setRunning(false); clearInterval(intervalRef.current); setTimeout(() => setRunning(true), 100); setStep(0); }}
          style={{ padding: "8px 20px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-primary)", cursor: "pointer", fontSize: 13 }}
        >
          {running ? "⏸ Pause" : "▶ Play"}
        </button>
        <button onClick={() => { setStep(-1); setRunning(false); }} style={{ padding: "8px 16px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-secondary)", cursor: "pointer", fontSize: 13 }}>↺ Reset</button>
        <button onClick={() => { setRunning(false); setStep(prev => Math.max(-1, prev - 1)); }} style={{ padding: "8px 16px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-secondary)", cursor: "pointer", fontSize: 13 }}>← Step</button>
        <button onClick={() => { setRunning(false); setStep(prev => Math.min(sequence.length - 1, prev + 1)); }} style={{ padding: "8px 16px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-secondary)", cursor: "pointer", fontSize: 13 }}>Step →</button>
      </div>
    </div>

);
};

export const PromiseStatesVisual = () => {
const [active, setActive] = useState(null);
const states = [
{ id: "pending", label: "Pending", icon: "⏳", color: "#FAEEDA", border: "#FAC775", text: "#633806", desc: "The initial state. The async work is in progress. Like a pizza order that's being prepared — you're waiting!" },
{ id: "fulfilled", label: "Fulfilled", icon: "✅", color: "#EAF3DE", border: "#C0DD97", text: "#3B6D11", desc: "The operation succeeded! The Promise now holds a value. Like your pizza arriving — time to enjoy the result with .then()." },
{ id: "rejected", label: "Rejected", icon: "❌", color: "#FCEBEB", border: "#F7C1C1", text: "#501313", desc: "Something went wrong. The Promise holds an error reason. Like the pizza place calling to say they can't deliver — handle it with .catch()." },
];

return (
<div style={{ display: "flex", gap: 12, margin: "20px 0", flexWrap: "wrap" }}>
{states.map(state => (
<div
key={state.id}
onClick={() => setActive(active === state.id ? null : state.id)}
style={{
            flex: "1 1 160px", background: active === state.id ? state.color : "var(--color-background-secondary)",
            border: `${active === state.id ? "1.5px" : "0.5px"} solid ${active === state.id ? state.border : "var(--color-border-tertiary)"}`,
            borderRadius: 12, padding: "20px 16px", cursor: "pointer", transition: "all 0.2s ease",
            transform: active === state.id ? "scale(1.02)" : "scale(1)"
          }} >
<div style={{ fontSize: 28, marginBottom: 8 }}>{state.icon}</div>
<div style={{ fontWeight: 500, fontSize: 16, color: active === state.id ? state.text : "var(--color-text-primary)", marginBottom: 4 }}>{state.label}</div>
{active === state.id && (
<div style={{ fontSize: 13, color: state.text, lineHeight: 1.6, marginTop: 8 }}>{state.desc}</div>
)}
{active !== state.id && (
<div style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>click to learn</div>
)}
</div>
))}
</div>
);
};

export const PromiseChainVisual = () => {
const [step, setStep] = useState(0);
const steps = [
{ title: "fetchUser(1)", color: "#EEEDFE", border: "#7F77DD", text: "#26215C", status: "⏳ Pending", desc: "An API call starts. Returns a Promise immediately." },
{ title: ".then(user => fetchOrders(user.id))", color: "#E6F1FB", border: "#378ADD", text: "#042C53", status: "✅ Got user data", desc: "First .then() receives the user, starts a new fetch for their orders." },
{ title: ".then(orders => formatOrders(orders))", color: "#EAF3DE", border: "#639922", text: "#173404", status: "✅ Got orders", desc: "Second .then() receives orders and formats them for display." },
{ title: ".catch(err => showError(err))", color: "#FCEBEB", border: "#E24B4A", text: "#501313", status: "🛡 Safety net", desc: "If ANY step fails, .catch() handles the error. One catch for the whole chain." },
{ title: ".finally(() => hideLoader())", color: "#FAEEDA", border: "#EF9F27", text: "#412402", status: "🏁 Always runs", desc: ".finally() runs whether success or failure — perfect for hiding loading spinners." },
];

return (
<div style={{ margin: "20px 0" }}>
<div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
{steps.map((s, i) => (
<div key={i} style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
{/_ Connector line _/}
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 40, flexShrink: 0 }}>
<div style={{ width: 2, height: i === 0 ? 16 : 24, background: i === 0 ? "transparent" : "var(--color-border-secondary)" }} />
<div style={{
                width: 32, height: 32, borderRadius: "50%", background: step === i ? s.color : "var(--color-background-secondary)",
                border: `2px solid ${step === i ? s.border : "var(--color-border-tertiary)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 500, color: step === i ? s.text : "var(--color-text-secondary)",
                flexShrink: 0, transition: "all 0.3s", cursor: "pointer"
              }} onClick={() => setStep(i)}>{i + 1}</div>
{i < steps.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 16, background: "var(--color-border-secondary)" }} />}
</div>

            {/* Content */}
            <div
              onClick={() => setStep(i)}
              style={{
                flex: 1, marginLeft: 12, marginBottom: 8, padding: "12px 16px", borderRadius: 8, cursor: "pointer",
                background: step === i ? s.color : "var(--color-background-secondary)",
                border: `0.5px solid ${step === i ? s.border : "var(--color-border-tertiary)"}`,
                transition: "all 0.3s"
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 12, color: step === i ? s.text : "var(--color-text-primary)", fontWeight: step === i ? 500 : 400 }}>{s.title}</div>
              {step === i && (
                <div style={{ marginTop: 8, fontSize: 13, color: s.text, fontFamily: "sans-serif", lineHeight: 1.6 }}>
                  <span style={{ opacity: 0.7 }}>{s.status}</span> — {s.desc}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 8, fontFamily: "sans-serif", textAlign: "center" }}>Click any step to explore it</div>
    </div>

);
};

export const AsyncAwaitComparison = () => {
const [view, setView] = useState("promise");

const promiseCode = `function loadUserProfile(userId) {
  return fetchUser(userId)
    .then(user => {
      return fetchOrders(user.id)
        .then(orders => {
          return fetchReviews(user.id)
            .then(reviews => {
              return { user, orders, reviews };
            });
        });
    })
    .catch(err => {
      console.error("Error:", err);
    });
}`;

const asyncCode = `async function loadUserProfile(userId) {
try {
const user = await fetchUser(userId);
const orders = await fetchOrders(user.id);
const reviews = await fetchReviews(user.id);

    return { user, orders, reviews };

} catch (err) {
console.error("Error:", err);
}
}`;

return (
<div style={{ margin: "20px 0" }}>
<div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
<button
onClick={() => setView("promise")}
style={{ padding: "8px 18px", borderRadius: 8, border: `1.5px solid ${view === "promise" ? "#7F77DD" : "var(--color-border-tertiary)"}`, background: view === "promise" ? "#EEEDFE" : "transparent", color: view === "promise" ? "#26215C" : "var(--color-text-secondary)", cursor: "pointer", fontSize: 13, fontWeight: view === "promise" ? 500 : 400, transition: "all 0.2s" }} >Promises (.then)</button>
<button
onClick={() => setView("async")}
style={{ padding: "8px 18px", borderRadius: 8, border: `1.5px solid ${view === "async" ? "#639922" : "var(--color-border-tertiary)"}`, background: view === "async" ? "#EAF3DE" : "transparent", color: view === "async" ? "#173404" : "var(--color-text-secondary)", cursor: "pointer", fontSize: 13, fontWeight: view === "async" ? 500 : 400, transition: "all 0.2s" }} >async / await</button>
</div>

      <div style={{ background: "#1e1e2e", borderRadius: 10, padding: 20 }}>
        <div style={{ fontSize: 11, color: "#585b70", marginBottom: 12, fontFamily: "sans-serif" }}>
          {view === "promise" ? "💭 Nested .then() chains get hard to read..." : "✨ async/await reads like regular synchronous code!"}
        </div>
        {(view === "promise" ? promiseCode : asyncCode).split("\n").map((line, i) => {
          const isKeyword = line.includes("async") || line.includes("await");
          const isCatch = line.includes("catch") || line.includes("try");
          return (
            <div key={i} style={{
              fontFamily: "monospace", fontSize: 12, lineHeight: 1.9,
              color: isKeyword ? "#cba6f7" : isCatch ? "#f38ba8" : "#cdd6f4"
            }}>{line}</div>
          );
        })}
      </div>

      {view === "async" && (
        <div style={{ background: "#EAF3DE", border: "0.5px solid #C0DD97", borderRadius: 8, padding: "10px 14px", marginTop: 12 }}>
          <span style={{ fontSize: 13, color: "#3B6D11", fontFamily: "sans-serif" }}>
            💡 <strong>await</strong> pauses <em>only this function</em> — not the whole program. Other code keeps running!
          </span>
        </div>
      )}
    </div>

);
};

export const ApiAnalogy = () => {
const [scene, setScene] = useState("order");
const scenes = {
order: { emoji: "🍕", title: "You place the order", sub: "Like calling fetch('/api/data')", color: "#E6F1FB", text: "#042C53" },
wait: { emoji: "⏳", title: "Kitchen is working", sub: "Server is processing your request", color: "#FAEEDA", text: "#412402" },
receive: { emoji: "🛎️", title: "Order arrives!", sub: "The Promise resolves with data", color: "#EAF3DE", text: "#173404" },
error: { emoji: "😞", title: "Kitchen is closed!", sub: "Promise rejects — .catch() handles it", color: "#FCEBEB", text: "#501313" },
};
const flow = ["order", "wait", "receive"];
const s = scenes[scene];

return (
<div style={{ margin: "20px 0", background: "var(--color-background-secondary)", borderRadius: 12, padding: 24 }}>
<div style={{ fontFamily: "sans-serif", fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 16 }}>Real-world analogy: ordering food</div>
<div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
{["order", "wait", "receive", "error"].map(key => (
<button
key={key}
onClick={() => setScene(key)}
style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${scene === key ? scenes[key].text : "var(--color-border-tertiary)"}`, background: scene === key ? scenes[key].color : "transparent", color: scene === key ? scenes[key].text : "var(--color-text-secondary)", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif" }} >{scenes[key].emoji} {scenes[key].title}</button>
))}
</div>
<div style={{ background: s.color, border: `1px solid var(--color-border-tertiary)`, borderRadius: 12, padding: 24, textAlign: "center", transition: "all 0.3s" }}>
<div style={{ fontSize: 48, marginBottom: 12 }}>{s.emoji}</div>
<div style={{ fontSize: 18, fontWeight: 500, color: s.text, fontFamily: "sans-serif", marginBottom: 6 }}>{s.title}</div>
<div style={{ fontSize: 13, color: s.text, fontFamily: "monospace", opacity: 0.8 }}>{s.sub}</div>
</div>
</div>
);
};

export const MicrotaskVisual = () => {
const [revealed, setRevealed] = useState(false);
const code = `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
.then(() => console.log('3'));

console.log('4');`;

return (
<div style={{ margin: "20px 0", background: "var(--color-background-secondary)", borderRadius: 12, padding: 24, fontFamily: "monospace" }}>
<div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 500, marginBottom: 12, color: "var(--color-text-primary)" }}>🧩 Quiz: What order does this print?</div>
<div style={{ background: "#1e1e2e", borderRadius: 8, padding: 16, marginBottom: 16 }}>
{code.split("\n").map((line, i) => <div key={i} style={{ fontSize: 12, lineHeight: 2, color: line.includes("Promise") || line.includes("then") ? "#cba6f7" : line.includes("setTimeout") ? "#fab387" : "#cdd6f4" }}>{line}</div>)}
</div>
<button onClick={() => setRevealed(!revealed)} style={{ padding: "8px 20px", borderRadius: 8, border: "0.5px solid var(--color-border-secondary)", background: "transparent", color: "var(--color-text-primary)", cursor: "pointer", fontSize: 13, fontFamily: "sans-serif", marginBottom: 12 }}>
{revealed ? "Hide answer" : "Reveal answer 👀"}
</button>
{revealed && (
<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
{[
{ output: "1", reason: "Synchronous — runs immediately", color: "#EAF3DE", text: "#3B6D11" },
{ output: "4", reason: "Synchronous — runs immediately after 1", color: "#EAF3DE", text: "#3B6D11" },
{ output: "3", reason: "Promise.then → Microtask Queue (runs before setTimeout!)", color: "#EEEDFE", text: "#26215C" },
{ output: "2", reason: "setTimeout → Callback Queue (lowest priority)", color: "#FAEEDA", text: "#412402" },
].map((item, i) => (
<div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: item.color, border: "0.5px solid var(--color-border-tertiary)", borderRadius: 8, padding: "10px 16px" }}>
<span style={{ fontSize: 20, fontWeight: 700, color: item.text, minWidth: 24 }}>{i + 1}.</span>
<span style={{ fontFamily: "monospace", fontSize: 13, color: item.text, fontWeight: 500 }}>"{item.output}"</span>
<span style={{ fontSize: 12, color: item.text, opacity: 0.8, fontFamily: "sans-serif" }}>— {item.reason}</span>
</div>
))}
<div style={{ background: "#E6F1FB", border: "0.5px solid #B5D4F4", borderRadius: 8, padding: "10px 14px", marginTop: 4 }}>
<span style={{ fontSize: 13, color: "#042C53", fontFamily: "sans-serif" }}>
💡 Key rule: <strong>Microtask Queue</strong> (Promises) always drains completely before the <strong>Callback Queue</strong> (setTimeout) gets a turn.
</span>
</div>
</div>
)}
</div>
);
};

export const FetchVisual = () => {
const [tab, setTab] = useState("fetch");
const tabs = {
fetch: {
label: "Basic fetch",
code: `async function getUser(id) {
  const response = await fetch(
    \`https://api.example.com/users/\${id}\`
);

if (!response.ok) {
throw new Error(\`HTTP error! status: \${response.status}\`);
}

const data = await response.json();
return data;
}

// Using it:
const user = await getUser(42);
console.log(user.name);`,
      notes: ["fetch() returns a Promise that resolves to a Response", "response.ok is false for 4xx/5xx errors — fetch does NOT auto-throw", "response.json() is itself async — needs another await"],
    },
    error: {
      label: "Error handling",
      code: `async function getUser(id) {
try {
const response = await fetch(
\`https://api.example.com/users/\${id}\`
);

    if (!response.ok) {
      throw new Error(\`Not found: \${response.status}\`);
    }

    return await response.json();

} catch (err) {
if (err.name === "TypeError") {
console.error("Network failure:", err);
} else {
console.error("API error:", err.message);
}
return null;
}
}`,
      notes: ["TypeError = network failure (no internet, DNS fail)", "Non-ok status codes = app-level errors (404, 500)", "Always return a sensible fallback value from catch"],
    },
    parallel: {
      label: "Parallel requests",
      code: `async function getDashboardData(userId) {
// ❌ Slow — waits for each one
// const profile = await fetchProfile(userId);
// const posts = await fetchPosts(userId);

// ✅ Fast — all run at the same time!
const [profile, posts, followers] =
await Promise.all([
fetchProfile(userId),
fetchPosts(userId),
fetchFollowers(userId),
]);

return { profile, posts, followers };
}`,
notes: ["Sequential awaits = slow (waterfall pattern)", "Promise.all() fires all requests at once", "Resolves when ALL resolve — or rejects if ANY fail"],
},
};

const t = tabs[tab];

return (
<div style={{ margin: "20px 0" }}>
<div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
{Object.entries(tabs).map(([key, val]) => (
<button key={key} onClick={() => setTab(key)} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${tab === key ? "#378ADD" : "var(--color-border-tertiary)"}`, background: tab === key ? "#E6F1FB" : "transparent", color: tab === key ? "#042C53" : "var(--color-text-secondary)", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif", fontWeight: tab === key ? 500 : 400 }}>
{val.label}
</button>
))}
</div>
<div style={{ background: "#1e1e2e", borderRadius: 10, padding: 20, marginBottom: 12 }}>
{t.code.split("\n").map((line, i) => {
const isComment = line.trim().startsWith("//");
const isKeyword = /\b(async|await|const|return|throw|try|catch)\b/.test(line);
return (
<div key={i} style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 1.9, color: isComment ? "#6c7086" : line.includes("fetch") || line.includes("Promise") ? "#89b4fa" : isKeyword ? "#cba6f7" : "#cdd6f4" }}>{line}</div>
);
})}
</div>
<div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
{t.notes.map((note, i) => (
<div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "var(--color-text-secondary)", fontFamily: "sans-serif", lineHeight: 1.5 }}>
<span style={{ color: "#378ADD", fontWeight: 500, flexShrink: 0 }}>→</span>
<span>{note}</span>
</div>
))}
</div>
</div>
);
};

# Async JavaScript: From Zero to Confident

**A step-by-step visual guide for beginners**

---

## Chapter 1 — How JavaScript Runs Code

Before we talk about async, we need to understand how JavaScript executes code _normally_. This foundation makes everything else click.

### 1.1 JavaScript is single-threaded

Imagine you're working at a coffee shop, and there's only _one barista_ (you). You can only do one thing at a time — take an order, make a coffee, clean the counter — never two things simultaneously. JavaScript works exactly like this. It has a single thread of execution: one task at a time, one after another.

This sounds like a limitation. It is — but JavaScript has clever tricks to handle waiting without freezing everything up. That's the whole story of async programming.

### 1.2 The Execution Context

When JavaScript runs your code, it creates an **Execution Context** — think of it as a workspace for a function. Every time a function is called, a new workspace (context) is created. The workspace contains:

- The function's local variables
- The value of `this`
- A reference to the outer scope (for closures)

The very first execution context is the **Global Execution Context** — JavaScript's main workspace when your script starts.

### 1.3 The Call Stack — functions stacking up

The **call stack** is how JavaScript keeps track of which function is running and where to return when it finishes. Think of it like a stack of plates — each function call adds a plate on top, and when a function finishes, its plate is removed.

**Step through this animation** to see how the call stack works:

<CallStackVisual />

**The key rule:** JavaScript only executes what's on top of the call stack. It's strictly one at a time, top-to-bottom.

### 1.4 Why this matters

If everything is one-at-a-time, what happens when JavaScript needs to wait for something slow — like fetching data from a server that takes 3 seconds?

**Without async:** The entire program freezes for 3 seconds. Your UI becomes unresponsive. The user is stuck staring at a frozen screen.

**With async:** JavaScript hands the slow task off to the browser, continues running other code, and picks up the result when it's ready. No freezing.

This is the problem that async programming solves.

---

## Chapter 2 — The Event Loop

The Event Loop is JavaScript's secret weapon for handling async without multiple threads. Understanding it demystifies almost everything confusing about JavaScript timing.

### 2.1 The Restaurant Analogy

Imagine a single waiter at a restaurant:

- They take your order (receive a task)
- They hand it to the kitchen (the Browser Web APIs)
- While the kitchen cooks, they serve other tables (run other code)
- When your food is ready, the kitchen rings a bell (callback queue)
- The waiter brings your food when they have a free moment (event loop checks the queue)

The waiter never stands at the kitchen window watching your food cook. They stay busy. That's exactly what JavaScript's event loop does.

### 2.2 The four players

| Player             | Role                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Call Stack**     | Where code actually runs. One thing at a time.                                                                |
| **Web APIs**       | Browser features (timers, fetch, DOM events) that handle slow work _outside_ JavaScript                       |
| **Callback Queue** | Completed async callbacks wait here                                                                           |
| **Event Loop**     | Constantly checks: "Is the call stack empty? Is there anything in the queue?" If yes → push the next callback |

### 2.3 Watch it live

The best way to understand the event loop is to watch it happen. Press **Play** and observe each step:

<EventLoopVisual />

### 2.4 The golden rule

> The Event Loop only moves a callback from the queue to the call stack when the call stack is completely empty.

This is why even `setTimeout(fn, 0)` (zero milliseconds!) doesn't run immediately — it waits until all synchronous code finishes first. The 0ms means "as soon as possible _after_ the current code finishes."

```js
console.log("A");
setTimeout(() => console.log("B"), 0); // 0ms timer!
console.log("C");

// Output: A, C, B
// "B" still runs last because the call stack wasn't empty yet
```

---

## Chapter 3 — Callbacks: The Original Async Pattern

Before Promises, JavaScript used **callbacks** — functions you pass as arguments that get called when async work finishes.

### 3.1 A simple callback

```js
// setTimeout takes a callback function as its first argument
setTimeout(function () {
  console.log("This runs after 2 seconds!");
}, 2000);

// readFile also uses callbacks (Node.js style)
fs.readFile("data.txt", "utf8", function (error, data) {
  if (error) {
    console.log("Something went wrong:", error);
    return;
  }
  console.log("File contents:", data);
});
```

### 3.2 The problem: Callback Hell

Callbacks work, but they create a problem when you need to do async tasks _in sequence_ — each depending on the previous result:

```js
// 😱 Callback Hell — the "Pyramid of Doom"
getUser(userId, function (error, user) {
  if (error) {
    handleError(error);
    return;
  }

  getOrders(user.id, function (error, orders) {
    if (error) {
      handleError(error);
      return;
    }

    getShippingInfo(orders[0].id, function (error, shipping) {
      if (error) {
        handleError(error);
        return;
      }

      sendEmail(user.email, shipping, function (error) {
        if (error) {
          handleError(error);
          return;
        }

        console.log("Done!"); // ← finally!
      });
    });
  });
});
```

Every level of nesting adds a tab stop. Error handling is duplicated everywhere. This is why Promises were invented.

---

## Chapter 4 — Promises: A Better Way to Handle Async

A **Promise** is an object that represents the _eventual result_ of an async operation. Instead of passing a callback into a function, the function returns a Promise — an IOU note that says "I'll give you the data when I'm done."

### 4.1 The three states of a Promise

Every Promise is always in one of three states. Click each to learn more:

<PromiseStatesVisual />

Once a Promise moves from Pending to either Fulfilled or Rejected, it **never changes state again**. This makes Promises predictable.

### 4.2 Creating a Promise

```js
// The Promise constructor takes an "executor" function
const myPromise = new Promise((resolve, reject) => {
  // Do some async work...
  const success = doSomeWork();

  if (success) {
    resolve("Here is the result!"); // → Fulfilled
  } else {
    reject(new Error("Something went wrong")); // → Rejected
  }
});
```

In practice, you rarely create Promises manually. Functions like `fetch()` already return Promises for you.

### 4.3 Using a Promise with .then() and .catch()

```js
const userPromise = fetchUser(42); // Returns a Promise

userPromise
  .then((user) => {
    // This runs when the Promise fulfills
    console.log("Got user:", user.name);
  })
  .catch((error) => {
    // This runs if the Promise rejects
    console.log("Error:", error.message);
  });
```

### 4.4 Promise Chains — fixing callback hell

The real power of Promises is **chaining**. Each `.then()` can return a new Promise, and the next `.then()` waits for it:

<PromiseChainVisual />

Compare this to callback hell — flat, readable, one error handler for everything:

```js
// ✅ Clean Promise chain
fetchUser(userId)
  .then((user) => fetchOrders(user.id))
  .then((orders) => fetchShipping(orders[0].id))
  .then((shipping) => sendEmail(user.email, shipping))
  .then(() => console.log("Done!"))
  .catch((err) => handleError(err)); // One catch handles ALL errors above
```

### 4.5 The pizza analogy

<ApiAnalogy />

### 4.6 Promise utility methods

```js
// Wait for ALL promises to resolve (fails if any fail)
const [user, posts, followers] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchFollowers(id),
]);

// Resolves as soon as the FIRST one resolves
const fastestResponse = await Promise.race([
  fetchFromServer1(),
  fetchFromServer2(),
]);

// Wait for all, get results for each (never rejects)
const results = await Promise.allSettled([
  fetchUser(id), // might fail
  fetchConfig(), // might fail
  fetchTheme(), // might fail
]);
// results[0] = { status: "fulfilled", value: ... }
// results[1] = { status: "rejected", reason: ... }
```

---

## Chapter 5 — async / await: Promises Made Beautiful

`async/await` is syntax sugar built on top of Promises. It lets you write async code that looks and reads like regular synchronous code — while still being non-blocking.

### 5.1 The keywords

- **`async`** — placed before a function declaration, it tells JavaScript: "this function will do async work, and it will always return a Promise"
- **`await`** — used inside an async function, it pauses that function's execution until a Promise resolves, then unwraps the value

```js
// Any function marked async returns a Promise automatically
async function getMessage() {
  return "Hello!";
  // Same as: return Promise.resolve("Hello!")
}

const msg = await getMessage();
console.log(msg); // "Hello!"
```

### 5.2 Side-by-side comparison

<AsyncAwaitComparison />

### 5.3 Error handling with try/catch

With async/await, you handle errors using regular `try/catch` — the same pattern you'd use for synchronous errors:

```js
async function loadProfile(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(user.id);
    const profile = buildProfile(user, posts);
    return profile;
  } catch (error) {
    // Catches errors from ANY of the awaited lines
    console.error("Failed to load profile:", error.message);
    return null; // Return a fallback
  } finally {
    // Always runs — perfect for cleanup
    hideLoadingSpinner();
  }
}
```

### 5.4 Common mistakes to avoid

```js
// ❌ Mistake 1: forgetting await
async function getUser() {
  const user = fetchUser(1); // Missing await!
  console.log(user); // Prints: Promise { <pending> }
}

// ✅ Fix:
async function getUser() {
  const user = await fetchUser(1); // Wait for the value
  console.log(user); // Prints: { id: 1, name: "Alice" }
}

// ❌ Mistake 2: using await outside async function
// await fetchUser(1); // SyntaxError!

// ✅ Fix: wrap in an async function
(async () => {
  const user = await fetchUser(1);
})();

// ❌ Mistake 3: unnecessary sequential awaits
async function slow() {
  const a = await fetchA(); // waits for A...
  const b = await fetchB(); // then waits for B...
  // Total time: time(A) + time(B)
}

// ✅ Fix: run in parallel
async function fast() {
  const [a, b] = await Promise.all([fetchA(), fetchB()]);
  // Total time: max(time(A), time(B))
}
```

---

## Chapter 6 — Why We Use Promises for APIs

This is the "why" behind everything. Understanding this makes you a better developer.

### 6.1 The core problem: networks are unpredictable

When you call a local function, it returns instantly. When you call an API, you're sending a request over the internet to a computer that might be thousands of miles away. This introduces:

- **Latency** — could be 50ms, could be 2000ms
- **Failure** — server might be down, network might cut out
- **Uncertainty** — you never know when (or if) you'll get a response

Blocking JavaScript execution while waiting for a response would freeze your entire webpage. This is unacceptable for user experience.

### 6.2 fetch() — the modern API tool

The browser's built-in `fetch()` function is Promise-based by design. Explore the patterns:

<FetchVisual />

### 6.3 A real-world API workflow

Here's how a full data-loading workflow looks in production code:

```js
// A real profile loading function
async function loadUserDashboard(userId) {
  const loadingEl = document.getElementById("loading");
  const errorEl = document.getElementById("error");
  const contentEl = document.getElementById("content");

  loadingEl.style.display = "block";
  errorEl.style.display = "none";

  try {
    // Run independent requests in parallel for speed
    const [user, stats, notifications] = await Promise.all([
      fetch(`/api/users/${userId}`).then((r) => r.json()),
      fetch(`/api/users/${userId}/stats`).then((r) => r.json()),
      fetch(`/api/users/${userId}/notifications`).then((r) => r.json()),
    ]);

    // Now render the data
    renderUser(user);
    renderStats(stats);
    renderNotifications(notifications);

    contentEl.style.display = "block";
  } catch (error) {
    errorEl.textContent = "Failed to load dashboard. Please try again.";
    errorEl.style.display = "block";
  } finally {
    loadingEl.style.display = "none"; // Always hide loader
  }
}
```

### 6.4 Why not just use callbacks for APIs?

```js
// ❌ Callback-based API (the old way)
getData("/api/user", function (err, user) {
  if (err) return showError(err);
  getData("/api/posts?userId=" + user.id, function (err, posts) {
    if (err) return showError(err);
    // ... nested further and further
  });
});

// ✅ Promise-based (modern)
const user = await fetch("/api/user").then((r) => r.json());
const posts = await fetch("/api/posts?userId=" + user.id).then((r) => r.json());
// Flat, readable, one error handler
```

Promises give you: flat code, centralized error handling, composability (Promise.all, Promise.race), and cancellation support.

---

## Chapter 7 — The Microtask Queue (Advanced)

There are actually _two_ queues in JavaScript, not one. Understanding this explains some surprising behavior.

### 7.1 Two queues

| Queue                          | What goes in it                                            | Priority                         |
| ------------------------------ | ---------------------------------------------------------- | -------------------------------- |
| **Microtask Queue**            | Promise `.then()` callbacks, `queueMicrotask()`            | Higher — drains completely first |
| **Callback Queue** (Macrotask) | `setTimeout`, `setInterval`, DOM events, `fetch` callbacks | Lower — checked after microtasks |

The Event Loop always empties the entire Microtask Queue before picking up the next item from the Callback Queue.

### 7.2 Quiz time

<MicrotaskVisual />

### 7.3 Why does this matter?

In practice, this rarely causes bugs — but it's essential for:

- Understanding why Promise `.then()` always runs before `setTimeout(fn, 0)`
- Debugging tricky ordering issues in tests
- Understanding how libraries like React batch state updates

---

## Chapter 8 — Quick Reference

### Choosing the right tool

| Situation                                        | Use                                              |
| ------------------------------------------------ | ------------------------------------------------ |
| Simple one-off async task                        | `async/await` with `try/catch`                   |
| Multiple independent requests                    | `Promise.all([...])`                             |
| First-one-wins race                              | `Promise.race([...])`                            |
| Multiple requests, handle each result separately | `Promise.allSettled([...])`                      |
| Creating your own async function                 | `return new Promise((resolve, reject) => {...})` |

### Mental checklist for async code

```
☐ Is the function marked async?
☐ Did I await all Promises?
☐ Is there a try/catch for error handling?
☐ Did I handle non-ok HTTP responses (response.ok)?
☐ Are independent requests running in parallel (Promise.all)?
☐ Is there a finally block for cleanup (hiding loaders)?
```

### The whole picture in one diagram

```
Your Code (sync)
    ↓
Call Stack executes synchronous code
    ↓
Async task encountered (fetch, setTimeout, etc.)
    ↓
Handed off to Web APIs (browser handles it)
    ↓  ← Your synchronous code keeps running
Web API completes
    ↓
Callback added to queue
    ↓
Event Loop: call stack empty? → move callback to stack
    ↓
Your callback runs with the result ✓
```

---

## What to learn next

You now understand the foundation that powers all of modern JavaScript. From here:

- **Error boundaries** — handling errors at the component level (React)
- **AbortController** — canceling in-flight fetch requests
- **Streams** — processing large responses chunk by chunk
- **WebSockets** — real-time two-way communication
- **Service Workers** — offline-first apps using the same Promise patterns

Every one of these builds directly on what you've learned here. You're ready.

---

_Built with React + MDX · All animations are interactive — click, step through, and experiment_
