import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Eye, EyeOff, Clock } from 'lucide-react';

interface Props {
  history: any[];
}

export default function PageStatusHistory({ history }: Props) {
  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-medium text-gray-400">Historique des changements</h4>
      <div className="space-y-2">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start gap-3 text-sm text-gray-400 bg-neutral-800/30 p-3 rounded-md"
          >
            {entry.new_status ? (
              <Eye className="w-4 h-4 text-green-400 mt-1" />
            ) : (
              <EyeOff className="w-4 h-4 text-red-400 mt-1" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white">
                  {entry.new_status ? 'Page rendue visible' : 'Page masquée'}
                </span>
                <span className="flex items-center gap-1 text-xs">
                  <Clock className="w-3 h-3" />
                  {format(new Date(entry.changed_at), 'dd MMM yyyy à HH:mm', { locale: fr })}
                </span>
              </div>
              {entry.reason && (
                <p className="text-sm text-gray-500 mt-1">{entry.reason}</p>
              )}
              <p className="text-xs text-gray-500">
                par {entry.changed_by}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}