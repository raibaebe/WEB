data Queue a = Queue [a] [a] deriving (Show)

create :: Queue a
create = Queue [] []

enqueue :: a -> Queue a -> Queue a
enqueue x (Queue front back) = Queue front (x:back)

dequeue :: Queue a -> (Maybe a, Queue a)
dequeue (Queue [] []) = (Nothing, Queue [] []) 
dequeue (Queue [] back) = dequeue (Queue (reverse back) []) 
empty, reverse back
dequeue (Queue (x:xs) back) = (Just x, Queue xs back) 

isEmpty :: Queue a -> Bool
isEmpty (Queue [] []) = True
isEmpty _ = False

main :: IO ()
main = do
 let q1 = create
 let q2 = enqueue 10 q1
 let q3 = enqueue 20 q2
 print q3
 let (item, q4) = dequeue q3
 print item
 print q4
 let emptyCheck = isEmpty q4
 print emptyCheck 