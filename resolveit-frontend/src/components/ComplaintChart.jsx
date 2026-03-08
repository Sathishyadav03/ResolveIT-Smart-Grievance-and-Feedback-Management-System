import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#2563eb", "#f59e0b", "#10b981"];

export default function ComplaintChart({ data }) {

return (

<PieChart width={400} height={300}>

<Pie
data={data}
dataKey="value"
nameKey="name"
cx="50%"
cy="50%"
outerRadius={100}
>

{data.map((entry, index) => (
<Cell key={index} fill={COLORS[index % COLORS.length]} />
))}

</Pie>

<Tooltip />
<Legend />

</PieChart>

)

}