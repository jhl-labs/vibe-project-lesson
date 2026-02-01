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
            ? 'rgba(218, 119, 86, 0.1)'
            : 'transparent',
          transition: 'background 0.15s',
        }}
        onClick={() => isFolder && setOpen(!open)}
        onMouseOver={(e) => {
          e.currentTarget.style.background = node.highlight
            ? 'rgba(218, 119, 86, 0.16)'
            : 'rgba(0,0,0,0.03)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = node.highlight
            ? 'rgba(218, 119, 86, 0.1)'
            : 'transparent';
        }}
      >
        {isFolder && (
          open
            ? <ChevronDown size={14} color="#8c857c" />
            : <ChevronRight size={14} color="#8c857c" />
        )}
        {isFolder
          ? (open
            ? <FolderOpen size={16} color="#da7756" />
            : <Folder size={16} color="#da7756" />)
          : <FileText size={16} color="#8c857c" />
        }
        <span style={{
          color: node.highlight ? '#c4613e' : (isFolder ? '#2d2a26' : '#5c564e'),
          fontSize: '13px',
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: node.highlight ? 600 : 400,
        }}>
          {node.name}
        </span>
        {node.description && (
          <span style={{
            color: '#8c857c',
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
      background: '#faf9f7',
      border: '1px solid #e0d9cf',
      borderRadius: '8px',
      padding: '12px 8px',
      margin: '16px 0',
    }}>
      {title && (
        <div style={{
          color: '#8c857c',
          fontSize: '12px',
          fontWeight: 600,
          padding: '0 8px 8px',
          borderBottom: '1px solid #f0ece5',
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
