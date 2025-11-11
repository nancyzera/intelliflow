import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

const blocks = [
  { id: 'gemini', label: 'Gemini Analyze' },
  { id: 'aiml', label: 'AI/ML STT/TTS' },
  { id: 'qdrant', label: 'Qdrant Search' }
]

export default function WorkflowBuilder() {
  const [steps, setSteps] = useState([])
  function onDragEnd(result) {
    if (!result.destination) return
    const sourceList = result.source.droppableId === 'palette' ? blocks : steps
    const item = sourceList[result.source.index]
    if (result.source.droppableId === 'palette' && result.destination.droppableId === 'canvas') {
      setSteps((s) => [...s, { ...item, uid: `${item.id}-${Date.now()}` }])
    } else if (result.source.droppableId === 'canvas' && result.destination.droppableId === 'canvas') {
      const next = Array.from(steps)
      const [moved] = next.splice(result.source.index, 1)
      next.splice(result.destination.index, 0, moved)
      setSteps(next)
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card">
        <div className="card-title">Blocks</div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="palette" isDropDisabled>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                {blocks.map((b, i) => (
                  <Draggable key={b.id} draggableId={`palette-${b.id}`} index={i}>
                    {(p) => (
                      <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps} className="px-3 py-2 rounded-md bg-white/5 border border-white/10">
                        {b.label}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="md:col-span-2 card">
        <div className="card-title">Canvas</div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="canvas">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[240px] space-y-2">
                {steps.map((s, i) => (
                  <Draggable key={s.uid} draggableId={s.uid} index={i}>
                    {(p) => (
                      <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps} className="px-3 py-2 rounded-md bg-neon-blue/10 border border-neon-blue/30">
                        {i + 1}. {s.label}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}



