
import { useState } from 'react'
export default function useTemplateSelection() {

    const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0)

    return [selectedTemplateIndex, setSelectedTemplateIndex]
}