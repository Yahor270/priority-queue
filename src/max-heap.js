const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root=null;
		this.parentNodes=[];
		this.nodes=[];
	}

	push(data, priority) {
		var n=new Node(data, priority);
		this.insertNode(n);
		this.shiftNodeUp(n);	
	}

	pop() {
		if(this.root!=null){
		 var x;
		 var detached=new Node(null,null);
		 x=this.root.data;
         detached=this.detachRoot();		 
		 if(this.parentNodes.length>0) {
			 this.restoreRootFromLastInsertedNode(detached);
		     this.shiftNodeDown(this.root);
		     }
		 return x;
		}
	}

	detachRoot() {
		var x=new Node(null,null);
		x=this.root;
		if (this.root.right!=null) {
			this.root.right.parent=null;
			this.root.right=null;
		}			
		else {
			if (this.root.left!=null) {
			this.root.left.parent=null;
			this.root.left=null;
		    }
			this.parentNodes.splice(this.parentNodes.indexOf(x),1);
		}
		this.nodes.splice(this.nodes.indexOf(x),1);
		this.root=null;
		return x
	}

	restoreRootFromLastInsertedNode(detached) {
		
		this.root=this.parentNodes.pop();
		this.parentNodes.unshift(this.root);	
	    if (this.root.parent!=null) {
			if(this.root.parent.right==this.root) {
			this.parentNodes.shift();
			this.parentNodes.unshift(this.root.parent);
			}
			this.root.parent.removeChild(this.root);
			}
		if (detached.left!=null) {
			this.root.left=detached.left;
			this.root.left.parent=this.root;
		}
		if (detached.right!=null) {
			this.root.right=detached.right;
			this.root.right.parent=this.root;
			this.parentNodes.splice(this.parentNodes.indexOf(this.root),1);
		}
		
		
	}

	size() {
		return this.nodes.length;
	}

	isEmpty() {
		if (this.parentNodes.length<1) return true;
		else return false;
	}

	clear() {
		this.root=null;
		this.parentNodes=[];
		this.nodes=[];
	}

	insertNode(node) {
		this.nodes.push(node);
		this.parentNodes.push(node);
		if (this.root==null) this.root=node;	
		 else {		  
		      this.parentNodes[0].appendChild(node);
		      if (this.parentNodes[0].right!=null) this.parentNodes.splice(0,1);
	        }	 
	}

	shiftNodeUp(node) {
		
		if (node.parent==null) this.root=node;
		else {
           if (node.priority>node.parent.priority) {			   
		     if (node.parent.right!=null) this.parentNodes.splice(this.parentNodes.indexOf(node),1,node.parent);
		     else { 
				 this.parentNodes[this.parentNodes.indexOf(node)]=node.parent;
				 this.parentNodes[this.parentNodes.indexOf(node.parent)]=node;
			 }
		     node.swapWithParent();			 
		     this.shiftNodeUp(node);
		        } 	 						 		 		 
		}
		
	}

	shiftNodeDown(node) {
		var buf=new Node(null,null);
		if (node.right!=null && (node.priority<node.right.priority || node.priority<node.left.priority )) { 
		 if (node.right.priority>node.left.priority) {
			 this.parentNodes.splice(this.parentNodes.indexOf(node.right),1,node);
			 node.right.swapWithParent();
		     } 
		 else {
			 this.parentNodes.splice(this.parentNodes.indexOf(node.left),1,node);
			 node.left.swapWithParent();
		     }   
		 this.shiftNodeDown(node);
		}
		else if (node.left!=null && node.priority<node.left.priority) {
			this.parentNodes.splice(this.parentNodes.indexOf(node),1,node.left);
		    this.parentNodes.splice(this.parentNodes.lastIndexOf(node.left),1,node);
			node.left.swapWithParent();
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
