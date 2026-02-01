import React, { useState } from 'react';
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown } from 'lucide-react';

interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  description?: string;
  highlight?: boolean;
  children?: TreeNode[];
}

interface FileTreeProps {
  data: TreeNode[];
  title?: string;
}

const TreeItem: React.FC<{
  node: TreeNode;
  depth: number;
}> = ({ node, depth }) => {
  const [open, setOpen] = useState(true);
  const isFolder = node.type === 'folder';

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 8px',
          paddingLeft: `${depth * 20 + 8}px`,
          cursor: isFolder ? 'pointer' : 'default',
          borderRadius: '4px',
          background: node.highlight
            ? 'rgba(99, 102, 241, 0.12)'
            : 'transparent',
          transition: 'background 0.15s',
        }}
        onClick={() => isFolder && setOpen(!open)}
        onMouseOver={(e) => {
          e.currentTarget.style.background = node.highlight
            ? 'rgba(99, 102, 241, 0.2)'
            : 'rgba(255,255,255,0.03)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = node.highlight
            ? 'rgba(99, 102, 241, 0.12)'
            : 'transparent';
        }}
      >
        {isFolder && (
          open
            ? <ChevronDown size={14} color="#94a3b8" />
            : <ChevronRight size={14} color="#94a3b8" />
        )}
        {isFolder
          ? (open
            ? <FolderOpen size={16} color="#818cf8" />
            : <Folder size={16} color="#818cf8" />)
          : <FileText size={16} color="#94a3b8" />
        }
        <span style={{
          color: node.highlight ? '#a5b4fc' : (isFolder ? '#e2e8f0' : '#cbd5e1'),
          fontSize: '13px',
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: node.highlight ? 600 : 400,
        }}>
          {node.name}
        </span>
        {node.description && (
          <span style={{
            color: '#64748b',
            fontSize: '12px',
            marginLeft: '8px',
          }}>
            {node.description}
          </span>
        )}
      </div>
      {isFolder && open && node.children?.map((child, i) => (
        <TreeItem key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
};

export const FileTree: React.FC<FileTreeProps> = ({ data, title }) => {
  return (
    <div style={{
      background: '#0f172a',
      border: '1px solid #334155',
      borderRadius: '8px',
      padding: '12px 8px',
      margin: '16px 0',
    }}>
      {title && (
        <div style={{
          color: '#94a3b8',
          fontSize: '12px',
          fontWeight: 600,
          padding: '0 8px 8px',
          borderBottom: '1px solid #1e293b',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {title}
        </div>
      )}
      {data.map((node, i) => (
        <TreeItem key={i} node={node} depth={0} />
      ))}
    </div>
  );
};
