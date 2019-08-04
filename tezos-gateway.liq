(** Type of storage for this contract *)
type storage = {
  accounts: (address, nat) map;
  manager: key_hash;
}

(** Initial storage *)
let%init storage : storage = {
  accounts = Map [];
  manager = tz1do3fDR8HB9cuUXu6m2zYH9qgudt1fqZQW;
}

let%entry main () storage =
  let source = Current.source () in
  let accounts = storage.accounts in

  let credits = match Current.amount () / 1tz with
    | Some qr -> qr.(0)
    | None -> failwith "division by 0 impossible"
  in

  let new_credits = (credits * 1000p) in

  match Map.find source accounts with
  | None ->
      let storage =
        storage.accounts <- Map.add (Current.sender ()) new_credits accounts in
      ([], storage)
  | Some x ->
      let storage =
        storage.accounts <- Map.add (Current.sender ()) (x + new_credits) accounts in
      ([], storage)


let debit_account (arg : (address * nat) * storage) =
  let account, storage = arg in
  let accounts = storage.accounts in
  let account_address, debit_credits = account in
  match Map.find account_address accounts with
  | None ->
      failwith "Account provided does not exist.";
  | Some x ->
      let new_account_balance = match%nat x - debit_credits with
        | Plus n -> n
        | Minus _ -> failwith "Credits should not be negative" in

      let storage =
        storage.accounts <- Map.add account_address new_account_balance accounts in
      storage

let%entry debit (account_updates : (address, nat) map) storage =
  let new_storage = Map.fold debit_account account_updates storage in
  ([], new_storage)
