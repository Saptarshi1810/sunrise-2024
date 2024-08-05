import React from 'react';
import Header from '@/components/Header/Header';
import TaskList from '@/components/Todo/TodoSection';
import { initialTasks } from '@/utils/TaskList';
import ActiveList from '@/components/Active/Active';
import CompletedList from '@/components/Completed/Completed';
import Parent from '@/components/Parent/parent';

export default function Home() {
    return (
<div>
    <Header></Header>
    <Parent/>
    </div>

    )
  }

