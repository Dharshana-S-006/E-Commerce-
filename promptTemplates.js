export const SYSTEM_PROMPT = `You are AuraAI, an advanced E-commerce Customer Support Agent.

Your Primary Capabilities:
1. Product Queries & Catalog Search: Help users find products, compare specs, check stock, and analyze prices.
2. Real-Time Order Tracking: Fetch live order shipment timelines, carrier updates, delivery ETAs using order IDs.
3. Automated Return & Refund Processing: Evaluate eligibility, handle returns, issue RMA codes, and provide return labels.
4. Personalized Recommendations: Leverage long-term user profile memory to tailor recommendations based on budget and past preferences.

Guidelines:
- Always maintain a warm, professional, helpful tone.
- When performing queries or lookups, issue tool calls with JSON parameters.
- Reference user memory traits (e.g. customer name, VIP status) when appropriate to personalize the conversation.
- Render visual widgets for products, order tracking timeline, and return authorizations.`;

export const HACKATHON_CODE_SNIPPETS = {
  python_openai: `import json
from openai import OpenAI

client = OpenAI(api_key="YOUR_OPENAI_API_KEY")

# 1. Define Tool Schemas (Function Calling)
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_order_status",
            "description": "Fetch live shipment status for an order ID",
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {"type": "string", "description": "e.g. ORD-8921"}
                },
                "required": ["order_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_catalog",
            "description": "Search product inventory by keyword or category",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string"},
                    "max_price": {"type": "number"}
                }
            }
        }
    }
]

# 2. Agent Execution Loop with Memory
user_profile = {"name": "Alex Rivera", "tier": "VIP Gold Member"}

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": f"You are AuraAI customer agent. Customer context: {json.dumps(user_profile)}"},
        {"role": "user", "content": "Where is my order #ORD-8921?"}
    ],
    tools=tools,
    tool_choice="auto"
)

# 3. Handle Tool Call Response
message = response.choices[0].message
if message.tool_calls:
    for tool_call in message.tool_calls:
        print(f"Agent Triggered Tool: {tool_call.function.name} with args: {tool_call.function.arguments}")
`,
  langchain: `from langchain_community.chat_models import ChatOpenAI
from langchain.agents import initialize_agent, AgentType
from langchain.tools import Tool

def fetch_order_status(order_id: str) -> str:
    # Custom tool function connecting to E-Com DB
    return f"Order {order_id} is Out for Delivery via FedEx. ETA: 4:30 PM."

order_tool = Tool(
    name="get_order_status",
    func=fetch_order_status,
    description="Useful for looking up customer order tracking status."
)

llm = ChatOpenAI(temperature=0, model="gpt-4o")
agent = initialize_agent(
    tools=[order_tool],
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

response = agent.run("Track package for ORD-8921")
print(response)
`,
  nodejs: `import { OpenAI } from "openai";

const openai = new OpenAI();

async function runSupportAgent(userPrompt, userMemory) {
  const messages = [
    { role: "system", content: \`You are an AI Support Agent. User memory: \${JSON.stringify(userMemory)}\` },
    { role: "user", content: userPrompt }
  ];

  const runner = openai.beta.chat.completions.runTools({
    model: "gpt-4o",
    messages,
    tools: [
      {
        type: "function",
        function: {
          name: "get_order_status",
          description: "Retrieve order tracking status",
          parameters: {
            type: "object",
            properties: { order_id: { type: "string" } },
            required: ["order_id"]
          },
          function: async ({ order_id }) => {
            return { status: "Out for Delivery", order_id, carrier: "FedEx" };
          }
        }
      }
    ]
  });

  const finalContent = await runner.finalContent();
  console.log("Agent Final Output:", finalContent);
}
`
};
