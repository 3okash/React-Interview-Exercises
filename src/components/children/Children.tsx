import { useState } from 'react'
import menu from './data'
import type { MenuItemType } from '../../types'

export default function MenuTree() {
    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-6">Recursive Menu Tree</h2>
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
                <ul className="space-y-1">
                    {menu.map((item) => (
                        <MenuItem key={item.id} item={item} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

interface MenuItemProps {
    item: MenuItemType
}

function MenuItem({ item }: MenuItemProps) {
    const [isOpen, setIsOpen] = useState(false)

    const hasChildren = item.children && item.children.length > 0
    const isLink = !hasChildren && item.href

    const toggleOpen = () => {
        if (hasChildren) {
            setIsOpen((prev) => !prev)
        }
    }

    return (
        <li className="list-none">
            <div
                className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-colors cursor-pointer ${hasChildren ? 'hover:bg-gray-50' : 'hover:bg-blue-50'
                    }`}
                onClick={toggleOpen}
            >
                {hasChildren && (
                    <span className={`text-xs transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-90' : ''}`}>
                        ▶
                    </span>
                )}
                {!hasChildren && <span className="w-3" />} {/* Spacer for items without icon */}

                <span className={`text-sm ${isLink ? 'text-blue-600 hover:underline' : 'font-medium text-gray-700'}`}>
                    {item.label}
                </span>
            </div>

            {hasChildren && isOpen && (
                <ul className="ml-6 mt-1 border-l-2 border-gray-100 pl-2">
                    {item.children?.map((child) => (
                        <MenuItem key={child.id} item={child} />
                    ))}
                </ul>
            )}
        </li>
    )
}