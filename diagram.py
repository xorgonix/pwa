from graphviz import Digraph

# Create a directed graph using Graphviz
graph = Digraph("o1_type_ai", format="png")
graph.attr(bgcolor="black", fontcolor="white", rankdir="LR")

# Set node attributes for dark mode
graph.attr("node", style="filled", shape="box", fillcolor="#2d3436", fontcolor="white")

# Set edge attributes for visibility in dark mode
graph.attr("edge", color="white")

# Add nodes and edges
graph.node("A", "o1-Type AI: Core Capabilities")
graph.node("B", "Complex Logical Reasoning")
graph.node("C", "Problem Decomposition")
graph.node("D", "Deep Coding Tasks")
graph.node("E", "Long-Term Context Retention")
graph.node("F", "Use Cases")
graph.node("G", "Debugging Complex Code")
graph.node("H", "Strategic Decision-Making")
graph.node("I", "Structured Writing & Analysis")
graph.node("J", "Education & Concept Exploration")

# Connect core capabilities to their examples
graph.edges([
    ("A", "B"), ("A", "C"), ("A", "D"), ("A", "E"),
    ("F", "G"), ("F", "H"), ("F", "I"), ("F", "J"),
    ("B", "F"), ("C", "F"), ("D", "F"), ("E", "F")
])

# Generate and save the diagram
output_path = "o1_type_ai"
graph.render(output_path, cleanup=True)

output_path + ".png"
